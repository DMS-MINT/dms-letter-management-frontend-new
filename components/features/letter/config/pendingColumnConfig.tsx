"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/shared/tableComponents";
import { Circle } from "lucide-react";
import { letterTableColumnLookup, letterTypeLookup } from "@/typing/dictionary";
import { LetterTableColumnEnum, ParticipantRolesEnum } from "@/typing/enum";
import { Badge } from "@/components/ui/badge";
import {
  ILetterListInputSerializer,
  IParticipantInputSerializer,
} from "@/typing/interface";
import { format } from "date-fns";
import { getParticipantInfo, getTranslatedLetterStatus } from "@/utils";
import React from "react";

const DateFormat: string = "eee MMM dd yyy";

export const pendingTableColumns: ColumnDef<ILetterListInputSerializer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="ሁሉንም ምረጥ"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="ረድፍ ይምረጡ"
      />
    ),
    size: 10,
  },
  {
    accessorKey: "has_read",
    header: () => <Circle size={13} className="text-gray-400" />,
    cell: ({ row }) => {
      const has_read: boolean = row.getValue("has_read");
      return (
        <Circle
          size={13}
          className={
            has_read
              ? "bg-primary rounded-full text-transparent"
              : "text-gray-400"
          }
        />
      );
    },
    size: 10,
  },
  {
    accessorKey: LetterTableColumnEnum.REFERENCE_NUMBER,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.REFERENCE_NUMBER]}
      />
    ),
    size: 30,
  },
  {
    accessorKey: LetterTableColumnEnum.SENDER,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SENDER]}
      />
    ),
    cell: ({ row }) => {
      const participants: IParticipantInputSerializer[] =
        row.original.participants;

      const senders = getParticipantInfo(
        ParticipantRolesEnum.AUTHOR,
        participants
      );
      return <p className="limited-table-chars">{senders ? senders : ""}</p>;
    },
    size: 400,
  },
  {
    accessorKey: LetterTableColumnEnum.RECIPIENT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.RECIPIENT]}
      />
    ),
    cell: ({ row }) => {
      const participants: IParticipantInputSerializer[] =
        row.original.participants;

      const recipients = getParticipantInfo(
        ParticipantRolesEnum["PRIMARY RECIPIENT"],
        participants
      );
      return <p className="limited-table-chars">{recipients ? recipients : ""}</p>;
    },
    size: 400,
  },
  {
    accessorKey: LetterTableColumnEnum.SUBJECT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SUBJECT]}
      />
    ),
    size: 300,
    cell: ({ row }) => {
      const subject: string = row.getValue(LetterTableColumnEnum.SUBJECT);

      return <p className="limited-chars">{subject}</p>;
    },
  },

  {
    accessorKey: LetterTableColumnEnum.LETTER_TYPE,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.LETTER_TYPE]}
      />
    ),
    size: 10,
    cell: ({ row }) => {
      const letter_type: string = row.getValue(
        LetterTableColumnEnum.LETTER_TYPE
      );

      return (
        <p className="limited-rows">
          {letterTypeLookup[letter_type.toUpperCase()]}
        </p>
      );
    },
  },
  {
    accessorKey: LetterTableColumnEnum.CURRENT_STATE,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.CURRENT_STATE]}
      />
    ),
    cell: ({ row }) => {
      const current_state: string = row.getValue(
        LetterTableColumnEnum.CURRENT_STATE
      );
      const { amharicTranslation, badgeVariant } =
        getTranslatedLetterStatus(current_state);
      return (
        <Badge
          variant="default"
          className="rounded-md flex items-center justify-between w-fit limited-rows"
        >
          {amharicTranslation}
        </Badge>
      );
    },
    size: 50,
  },
  {
    accessorKey: LetterTableColumnEnum.SUBMITTED_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SUBMITTED_AT]}
        className="w-fit ml-auto "
      />
    ),

    cell: ({ row }) => {
      const submitted_at: string = row.getValue(
        LetterTableColumnEnum.SUBMITTED_AT
      );
      return (
        <div className="text-right font-medium px-4 py-1 limited-rows">
          {submitted_at ? format(new Date(submitted_at), DateFormat) : ""}
        </div>
      );
    },
    size: 50,
  },
];
