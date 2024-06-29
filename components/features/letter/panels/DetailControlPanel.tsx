"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dot, Printer } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  selectStatus,
} from "@/lib/features/letter/letterSlice";
import { letterStatusLookup } from "@/typing/dictionary";
import { Skeleton } from "@/components/ui/skeleton";
import ActionButtons from "../miscellaneous/ActionButtons";
import { useEffect, useState } from "react";
import { RequestStatusEnum } from "@/typing/enum";

interface IContentJson {
  content: string;
}

export default function DetailControlPanel() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const status = useAppSelector(selectStatus);
  const [contentJson, setContentJson] = useState<IContentJson[]>([]);

  useEffect(() => {
    setContentJson([
      { content: letterDetails.content ? letterDetails.content : "" },
    ]);
  }, [letterDetails]);

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

  return (
    <section className="flex items-center justify-between w-full">
      {status === RequestStatusEnum.FULFILLED ? (
        letterDetails.subject ? (
          <h1 className="page-title limited-chars ">{letterDetails.subject}</h1>
        ) : (
          <h1 className="page-title !text-gray-400">ርዕሰ ጉዳይ የሌለው ደብዳቤ</h1>
        )
      ) : (
        <Skeleton className="h-8 w-96" />
      )}

      {status === RequestStatusEnum.FULFILLED ? (
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 ml-2"
        >
          <Dot /> {letterStatusLookup[letterDetails.current_state]}
        </Badge>
      ) : (
        <Skeleton className="h-8 w-14 ml-2" />
      )}
      {status === RequestStatusEnum.FULFILLED ? (
        <div className="flex items-center ml-auto gap-2">
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer size={20} />
          </Button>
          <ActionButtons />
        </div>
      ) : null}
    </section>
  );
}
