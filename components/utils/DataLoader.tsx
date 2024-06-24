"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/hooks";
import { getContacts } from "@/lib/features/contact/contactSlice";
import { getMe } from "@/lib/features/authentication/authSlice";

export default function DataLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = () => {
      try {
        // Fetch Me
        dispatch(getMe({}));

        // Fetch contacts
        dispatch(getContacts({}));
      } catch (error: any) {
        toast.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return <span className="absolute"></span>;
}
