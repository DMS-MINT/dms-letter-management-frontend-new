"use client";
import { Button } from "@/components/ui/button";
import {
  selectIsDrawerOpen,
  toggleDrawerVisibility,
} from "@/lib/features/ui/uiManagerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Menu } from "lucide-react";

export default function Subheader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const dispatch = useAppDispatch();

  return (
    <section className="flex items-center py-3 pl-5 pr-8 bg-gray-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(toggleDrawerVisibility(!isDrawerOpen))}
      >
        <Menu className="w-6 h-6" />
      </Button>
      {children}
    </section>
  );
}
