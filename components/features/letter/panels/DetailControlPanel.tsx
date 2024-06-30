/** @format */

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
import HeaderTemplate from "./HeaderTemplate";
import FooterTemplate from "./FooterTemplate";
import HeaderOutgoingTemplate from "./HeaderOutgoingTemplate";
import FooterOutgoingTemplate from "./FooterOutgoingTemplate";
import { renderToString } from "react-dom/server";

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
      let header;
      let footer;
      if (letterDetails?.letter_type === "internal") {
        header = renderToString(
          <HeaderTemplate letterDetails={letterDetails} />
        );
        footer = renderToString(
          <FooterTemplate letterDetails={letterDetails} />
        );
      } else {
        header = renderToString(
          <HeaderOutgoingTemplate letterDetails={letterDetails} />
        );
        footer = renderToString(
          <FooterOutgoingTemplate letterDetails={letterDetails} />
        );
      }

      const content = contentJson.map((item) => item.content).join("");

      const printableContent = `
        <html>
          <head>
            <style>
              @page {
                size: auto;
                margin: 20mm 5mm; 
              }
              body {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              .header, .footer {
                width: 100%;
              }
              .content {
                margin-left: 15mm;
                margin-right: 15mm;
                padding: 0.5rem;
                padding-top: 1rem;
                padding-bottom: 0;
              }
                p {
              margin: 0.5rem;
              }
            </style>
          </head>
          <body>
            <div class="header">${header}</div>
            <div class="content">${content}</div>
            <div class="footer">${footer}</div>
          </body>
        </html>
      `;
      printJS({
        printable: printableContent,
        type: "raw-html",
        scanStyles: false,
        documentTitle: `${letterDetails.subject}`,
      });
    }
  };

  // page-break-inside: avoid;
  return (
    <section className="flex items-center justify-between w-full">
      {status === RequestStatusEnum.FULFILLED ? (
        letterDetails ? (
          <h1 className="page-title">{letterDetails.subject}</h1>
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
          <Dot /> {letterStatusLookup[letterDetails?.current_state]}
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
