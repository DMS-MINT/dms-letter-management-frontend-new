"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dot, Printer } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { letterStatusLookup } from "@/typing/dictionary";
import { Skeleton } from "@/components/ui/skeleton";
import ActionButtons from "../miscellaneous/ActionButtons";
import { selectPermissions } from "@/lib/features/letter/workflow/workflowSlice";
import { useEffect, useState } from "react";

interface IContentJson {
  content: string;
}

export default function DetailControlPanel() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const permissions = useAppSelector(selectPermissions);
  const [contentJson, setContentJson] = useState<IContentJson[]>([]);

  useEffect(() => {
    setContentJson([
      { content: letterDetail.content ? letterDetail.content : "" },
    ]);
  }, [letterDetail]);

  const handlePrint = async () => {
    if (typeof window !== "undefined") {
      const printJS = (await import("print-js")).default;
      printJS({
        printable: contentJson,
        properties: ["content"],
        type: "json",
      });
    }
  };

  if (Object.keys(permissions).length === 0) {
    return null;
  }

  return (
    <section className="flex items-center justify-between w-full">
      {Object.keys(permissions).length !== 0 ? (
        letterDetail.subject ? (
          <h1 className="page-title">{letterDetail.subject}</h1>
        ) : (
          <h1 className="page-title !text-gray-400">ርዕሰ ጉዳይ የሌለው ደብዳቤ</h1>
        )
      ) : (
        <Skeleton className="h-8 w-96" />
      )}

      {letterDetail.current_state && letterDetail.current_state ? (
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 ml-2"
        >
          <Dot /> {letterStatusLookup[letterDetail.current_state]}
        </Badge>
      ) : (
        <Skeleton className="h-8 w-14 ml-2" />
      )}

      <div className="flex items-center ml-auto gap-2">
        <Button variant="outline" size="icon" onClick={handlePrint}>
          <Printer size={20} />
        </Button>
        <ActionButtons />
      </div>
    </section>
  );
}
