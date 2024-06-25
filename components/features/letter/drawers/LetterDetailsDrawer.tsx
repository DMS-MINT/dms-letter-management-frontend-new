"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  selectLetterDetails,
  selectStatus,
} from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";
import { letterTypeLookup } from "@/typing/dictionary";
import { RequestStatusEnum } from "@/typing/enum";
import { Mail, MessageSquare, FileDigit } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

interface ILetterMetaData {
  label: string;
  value: string;
  icon: JSX.Element;
}

export default function LetterDetailsDrawer() {
  const status = useAppSelector(selectStatus);
  const letterDetails = useAppSelector(selectLetterDetails);
  const [letterMeta, setLetterMeta] = useState<ILetterMetaData[]>([]);

  useEffect(() => {
    if (letterDetails.letter_type) {
      const LetterMetaData: ILetterMetaData[] = [
        {
          label: "የደብዳቤ አይነት",
          value: letterTypeLookup[letterDetails.letter_type.toUpperCase()],
          icon: <Mail size={20} className="text-gray-600" />,
        },
        {
          label: "የመዝገብ ቁጥር",
          value: letterDetails.reference_number,
          icon: <FileDigit size={20} className="text-gray-600" />,
        },
      ];
      setLetterMeta(LetterMetaData);
    }
  }, [letterDetails]);

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        {letterMeta.map(({ label, value, icon }) => (
          <Fragment key={label}>
            <div className="flex items-center gap-2">
              {icon}
              <p className="text-gray-600">{label}</p>
            </div>
            {status === RequestStatusEnum.FULFILLED ? (
              <Badge className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal mb-2">
                {value}
              </Badge>
            ) : (
              <Skeleton className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal mb-2" />
            )}
          </Fragment>
        ))}
      </div>
      {status === RequestStatusEnum.FULFILLED ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-gray-600" />
            <p className="text-gray-600">
              {letterDetails.comments ? letterDetails.comments.length : 0}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
