"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getContacts } from "@/lib/features/contact/contactSlice";
import { getMe } from "@/lib/features/authentication/authSlice";
import { selectPermissions } from "@/lib/features/letter/workflow/workflowSlice";
import { toggleIsReadOnly } from "@/lib/features/ui/uiManagerSlice";

export default function DataLoader() {
  const permissions = useAppSelector(selectPermissions);
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

  useEffect(() => {
    dispatch(toggleIsReadOnly(!permissions.can_update_letter));
  }, [permissions]);

  return <span className="absolute"></span>;
}
