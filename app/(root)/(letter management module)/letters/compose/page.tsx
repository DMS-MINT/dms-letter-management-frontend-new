"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  resetLetterDetail,
  setLetterType,
} from "@/lib/features/letter/letterSlice";
import { LetterComposeForm } from "@/components/features/letter";
import { LetterType } from "@/typing/interface";
import { letterTypeLookup } from "@/typing/dictionary";
import { useEffect, useState } from "react";
import { selectMe } from "@/lib/features/authentication/authSlice";
import {
  selectIsReadonly,
  toggleIsReadOnly,
} from "@/lib/features/ui/uiManagerSlice";

interface ITabs {
  label: LetterType;
  isVisible: boolean;
}

export default function Compose() {
  const me = useAppSelector(selectMe);
  const [tabs, setTabs] = useState<ITabs[]>([]);
  const isReadonly = useAppSelector(selectIsReadonly);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isReadonly) {
      dispatch(toggleIsReadOnly(false));
    }
  }, [isReadonly]);

  useEffect(() => {
    setTabs([
      {
        label: "internal",
        isVisible: true,
      },
      {
        label: "outgoing",
        isVisible: true,
      },
      {
        label: "incoming",
        isVisible: me.is_staff,
      },
    ]);
  }, [me]);

  useEffect(() => {
    dispatch(resetLetterDetail());
    dispatch(setLetterType("internal"));
  }, []);

  return (
    <Tabs defaultValue="internal" className="h-full flex flex-col">
      <TabsList className="w-fit">
        {tabs
          .filter((tab) => tab.isVisible === true)
          .map(({ label }) => (
            <TabsTrigger
              key={label}
              value={label}
              onClick={() => {
                dispatch(resetLetterDetail());
                dispatch(setLetterType(label));
              }}
            >
              {letterTypeLookup[label.toUpperCase()]}
            </TabsTrigger>
          ))}
      </TabsList>

      {tabs
        .filter((tab) => tab.isVisible === true)
        .map(({ label }) => (
          <TabsContent key={label} value={label} className="flex-1">
            <LetterComposeForm />
          </TabsContent>
        ))}
    </Tabs>
  );
}
