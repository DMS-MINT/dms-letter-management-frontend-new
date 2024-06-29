"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pen, Eraser, RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  signLetter,
} from "@/lib/features/letter/letterSlice";
import { v4 as uuidv4 } from "uuid";

type EditorToolType = {
  label?: string;
  icon?: JSX.Element;
  isDisabled: boolean;
  action: React.MouseEventHandler<HTMLButtonElement>;
};

export default function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [lastX, setLastX] = useState<number | null>(null);
  const [lastY, setLastY] = useState<number | null>(null);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [editorTools, setEditorTools] = useState<EditorToolType[]>([]);
  const dispatch = useAppDispatch();
  const letterDetails = useAppSelector(selectLetterDetails);

  const handleCanvasMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        setDrawing(true);
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        setLastX(x);
        setLastY(y);
        context.beginPath();
        context.moveTo(x, y);
      }
    }
  };

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (drawing && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        context.lineTo(x, y);
        context.strokeStyle = eraseMode ? "#ffffff" : strokeColor;
        context.lineWidth = strokeWidth;
        context.stroke();
        setLastX(x);
        setLastY(y);
      }
    }
  };

  const handleCanvasMouseUp = () => {
    setDrawing(false);
  };

  const handleStrokeWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStrokeWidth(Number(event.target.value));
  };

  useEffect(() => {
    const tools: EditorToolType[] = [
      {
        isDisabled: !eraseMode,
        icon: <Pen />,
        action: () => {
          setEraseMode(false);
        },
      },
      {
        isDisabled: eraseMode,
        icon: <Eraser />,
        action: () => {
          setEraseMode(true);
        },
      },
      // {
      //   isDisabled: false,
      //   icon: <Undo />,
      //   action: () => {
      //   },
      // },
      {
        isDisabled: false,
        icon: <RefreshCw />,
        action: () => {
          if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            if (context) {
              context.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
            }
          }
        },
      },
      {
        isDisabled: false,
        label: "ፊርማውን አስቀምጥ",
        action: () => {
          if (canvasRef.current) {
            canvasRef.current.toBlob((blob) => {
              if (blob) {
                const file = new File([blob], "signature.png", {
                  type: "image/png",
                });
                dispatch(signLetter(file));
              }
            }, "image/png");
          }
        },
      },
    ];

    setEditorTools(tools);
  }, [eraseMode]);

  return (
    <section className="flex flex-col border border-t-0 bg-white border-gray-300 w-fit mx-auto">
      <div className="flex gap-3 items-center p-2 justify-end">
        {editorTools.map(({ label, icon, action, isDisabled }) => (
          <Button
            key={uuidv4()}
            variant="outline"
            type="button"
            size={icon ? "icon" : "default"}
            disabled={isDisabled}
            onClick={action}
          >
            {label}
            {icon}
          </Button>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        width={480}
        height={200}
        defaultValue={
          "http://127.0.0.1:8000/media/letters/signatures/signature.png"
        }
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseOut={handleCanvasMouseUp}
      ></canvas>
      <input
        disabled={eraseMode}
        type="range"
        className="form-range ml-3 mr-3 px-3"
        min="1"
        max="20"
        step="1"
        id="strokeWidth"
        value={strokeWidth}
        onChange={handleStrokeWidthChange}
      />
    </section>
  );
}
