import { selectMe } from "@/lib/features/authentication/authSlice";
import { updateLetterDetails } from "@/lib/features/letter/letterSlice";
import { setPermissions } from "@/lib/features/letter/workflow/workflowSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";

interface UseWebSocketReturn {
  data: any;
  isOpen: boolean;
  sendMessage: (message: any) => void;
}

const useWebSocket = (referenceNumber: string): UseWebSocketReturn => {
  const me = useAppSelector(selectMe);
  const [data, setData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000;

  const connectWebSocket = () => {
    ws.current = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_IP_ADDRESS}/ws/letters/${referenceNumber}/`
    );

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
      setIsOpen(true);
      reconnectAttempts.current = 0;
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const response = JSON.parse(event.data);
      const permissions = response.message.permissions;
      dispatch(updateLetterDetails(response.message.data));
      dispatch(setPermissions({ permissions, me }));
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setIsOpen(false);
      if (reconnectAttempts.current < maxReconnectAttempts) {
        setTimeout(connectWebSocket, reconnectInterval);
        reconnectAttempts.current += 1;
      } else {
        console.error("Max reconnect attempts reached. Could not reconnect.");
      }
    };

    ws.current.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      ws.current?.close();
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [referenceNumber, me, dispatch]);

  const sendMessage = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { data, isOpen, sendMessage };
};

export default useWebSocket;
