"use client";

import { Button } from "@/components/ui/button";
import {
  deleteLetter,
  selectLetterDetails,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import {
  closeLetter,
  publishLetter,
  reopenLetter,
  retractLetter,
  selectPermissions,
  submitLetter,
} from "@/lib/features/letter/workflow/workflowSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateLetterSerializer } from "@/utils";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ShareLetterForm } from "@/components/features/letter";
import { redirect } from "next/navigation";
interface IButtonConfig {
  isVisible: boolean;
  isButton: boolean;
  component?: JSX.Element;
  label?: string | null;
  icon?: JSX.Element;
  variant:
    | "link"
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "third"
    | "ghost";
  size: "default" | "sm" | "lg" | "icon";
  style: string;
  action: () => void;
}

export default function ActionButtons() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const permissions = useAppSelector(selectPermissions);
  const [buttonConfigs, setButtonConfigs] = useState<IButtonConfig[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(permissions).length > 0) {
      const configs: IButtonConfig[] = [
        {
          isVisible: permissions.can_delete_letter,
          isButton: true,
          variant: "outline",
          style: "",
          size: "icon",
          icon: <Trash size={20} />,
          action: () => {
            dispatch(deleteLetter(letterDetails.reference_number));
            redirect("/letters/inbox/");
          },
        },
        {
          isVisible: permissions.can_share_letter,
          isButton: false,
          component: <ShareLetterForm />,
          label: "ደብዳቤውን አጋራ",
          variant: "outline",
          style: "",
          size: "default",
          action: () => {},
        },
        {
          isVisible: permissions.can_update_letter,
          isButton: true,
          label: "ለውጦቹን አስቀምጥ",
          variant: "outline",
          style: "",
          size: "default",
          action: () => {
            const serializedLetter = updateLetterSerializer(letterDetails);
            console.table(letterDetails.participants);

            dispatch(
              updateLetter({
                reference_number: letterDetails.reference_number,
                letter: serializedLetter,
              })
            );
          },
        },
        {
          isVisible: permissions.can_submit_letter,
          isButton: true,
          label: "ወደ መዝገብ ቢሮ አስተላልፍ",
          variant: "default",
          style: "",
          size: "default",
          action: () => {
            const serializedLetter = updateLetterSerializer(letterDetails);

            dispatch(
              updateLetter({
                reference_number: letterDetails.reference_number,
                letter: serializedLetter,
              })
            );

            dispatch(submitLetter(letterDetails.reference_number));
          },
        },
        {
          isVisible: permissions.can_retract_letter,
          isButton: true,
          label: "ለክለሳ መልስ",
          variant: "destructive",
          style: "",
          size: "default",
          action: () => {
            dispatch(retractLetter(letterDetails.reference_number));
          },
        },
        {
          isVisible: permissions.can_reject_letter,
          isButton: true,
          label: "ደብዳቤውን አትቀበል",
          variant: "destructive",
          style: "",
          size: "default",
          action: () => {
            console.log("REJECT LETTER PUBLISH REQUEST");
          },
        },
        {
          isVisible: permissions.can_publish_letter,
          isButton: true,
          label: "ደብዳቤውን አከፋፍል",
          variant: "third",
          style: "",
          size: "default",
          action: () => {
            dispatch(publishLetter(letterDetails.reference_number));
          },
        },
        {
          isVisible: permissions.can_close_letter,
          isButton: true,
          label: "የደብዳቤውን የስራ ሂደት አጠናቅ",
          variant: "third",
          style: "",
          size: "default",
          action: () => {
            dispatch(closeLetter(letterDetails.reference_number));
          },
        },
        {
          isVisible: permissions.can_reopen_letter,
          isButton: true,
          label: "የደብዳቤውን የስራ ሂደት እንደገና ክፈት",
          variant: "default",
          style: "",
          size: "default",
          action: () => {
            dispatch(reopenLetter(letterDetails.reference_number));
          },
        },
      ];
      setButtonConfigs(configs);
    }
  }, [letterDetails, permissions]);

  return (
    <>
      {buttonConfigs
        .filter((action) => action.isVisible === true)
        .map(
          ({
            label,
            icon,
            variant,
            size,
            style,
            action,
            isButton,
            component,
          }) =>
            isButton ? (
              <Button
                key={uuidv4()}
                variant={variant}
                size={size}
                className={style}
                onClick={action}
              >
                {label}
                {icon}
              </Button>
            ) : (
              <React.Fragment key={uuidv4()}>{component}</React.Fragment>
            )
        )}
    </>
  );
}
