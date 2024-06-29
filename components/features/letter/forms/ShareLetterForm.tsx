"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Select, { ActionMeta } from "react-select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import {
  ContactType,
  IShareLetterFormData,
  PermissionType,
} from "@/typing/interface";
import { Label } from "@/components/ui/label";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { shareLetter } from "@/lib/features/letter/workflow/workflowSlice";

import React from "react";
import { Separator } from "@radix-ui/react-select";
import { ArrowLeft } from "lucide-react";

type Privilage = {
  value: string;
  label: string;
};

const privilages: Privilage[] = [
  {
    value: "can_view_letter",
    label: "ተመልካች",
  },
  {
    value: "can_comment_letter",
    label: "አስተያየት ሰጪ",
  },
  {
    value: "can_update_letter",
    label: "አርታዒ",
  },
  {
    value: "can_share_letter",
    label: "አጋሪ",
  },
  {
    value: "transfer_ownership",
    label: "ባለቤትነትን ያስተላልፉ",
  },
  {
    value: "remove_access",
    label: "ፈቃድን ያስወግዱ",
  },
];

interface IFormData {
  to: string;
  message: string;
}

export default function ShareLetterForm() {
  const [formData, setFormData] = useState<IShareLetterFormData>({
    to: [],
    message: "",
    permissions: ["can_update_letter"],
  });
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();
  const letterDetails = useAppSelector(selectLetterDetails);

  const filteredOptions = useMemo(() => {
    return contacts.filter((contact) => {
      // Check if the contact is not already selected
      return !letterDetails.participants.some(
        (participant) => participant.user.id === contact.id
      );
    });
  }, [contacts, letterDetails.participants]);

  const handleSelectChange = (
    option: readonly ContactType[],
    actionMeta: ActionMeta<ContactType>
  ) => {
    const { action, option: selectedOption, removedValue } = actionMeta;

    const handleSelectOption = (selectedOption: ContactType) => {
      const user_id = selectedOption.id;
      setFormData((prevData: IShareLetterFormData) => ({
        ...prevData,
        to: [...prevData.to, user_id],
      }));
    };

    const handleRemoveValue = (removedValue: ContactType) => {
      const user_id = removedValue.id;
      const ids = formData.to.filter((id) => id !== user_id);
      setFormData((prevData: IShareLetterFormData) => ({
        ...prevData,
        to: ids,
      }));
    };
    const handleClear = () => {
      setFormData((prevData: IShareLetterFormData) => ({
        ...prevData,
        to: [],
      }));
    };

    switch (action) {
      case "select-option":
        if (selectedOption) handleSelectOption(selectedOption);
        break;
      case "remove-value":
        if (removedValue) handleRemoveValue(removedValue);
        break;
      case "clear":
        handleClear();
        break;
      default:
        break;
    }
  };

  const handlePermissionChange = (value: PermissionType) => {
    console.log(formData);
    setFormData((prevData: IShareLetterFormData) => ({
      ...prevData,
      permissions: [value],
    }));
  };

  const handleMessageChange = (message: string) => {
    setFormData((prevData: IShareLetterFormData) => ({ ...prevData, message }));
  };

  const handleSubmit = () => {
    dispatch(
      shareLetter({
        reference_number: letterDetails.reference_number,
        participants: formData,
      })
    );
  };

  const getLabel = (option: ContactType): string => {
    if (option.user_type === "member") {
      return `${option.full_name} - ${option.job_title}`;
    } else {
      return `${option.name}`;
    }
  };

  const getValue = (option: ContactType): string => {
    if (option.user_type === "member") {
      return option.id;
    } else {
      return option.name;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>ደብዳቤውን አጋራ</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40rem] max-w-[70rem] max-h-[80rem] flex flex-col">
        <DialogHeader className="flex-1 p-2">
          <DialogTitle>የደብዳቤ መምሪያ</DialogTitle>

          <div className="flex items-center gap-1.5 py-3">
            <Label className="w-5">ለ</Label>
            <Select
              isMulti
              onChange={handleSelectChange}
              placeholder=""
              options={filteredOptions}
              getOptionLabel={getLabel}
              getOptionValue={getValue}
              className="w-full"
            />
            {formData.to ? (
              <SelectUI
                defaultValue="can_view_letter"
                onValueChange={handlePermissionChange}
              >
                <SelectTrigger
                  onClick={() => console.log("dsfs")}
                  className="ml-auto w-[165px]"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {privilages.map((privilage) => (
                    <SelectItem key={privilage.value} value={privilage.value}>
                      {privilage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectUI>
            ) : null}
          </div>
          {formData.to ? (
            <div className="flex flex-col gap-2 mt-4">
              <Label>መልእክት ማስቀመጫ</Label>
              <Textarea
                id="መልእክት ማስቀመጫ"
                className="bg-gray-100"
                value={formData.message}
                onChange={(e) => handleMessageChange(e.target.value)}
              />
              <DialogFooter className="">
                <Button variant={"outline"}>ሰርዝ</Button>
                <Button onClick={handleSubmit}>ምራ</Button>
              </DialogFooter>
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                <h1 className="text-sm font-bold">ፈቃድ ያላቸው ሰዎች</h1>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatars/03.png" />
                        <AvatarFallback>አአ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ
                        </p>
                        <p className="text-sm text-muted-foreground">
                          አበባው አዲሱ
                        </p>
                      </div>
                    </div>
                    <p>ባለቤት</p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatars/05.png" />
                        <AvatarFallback>ቤበ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          ሚኒስትር ጽ/ቤት ኃላፊ
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ቤዛዊት በጋሻው
                        </p>
                      </div>
                    </div>
                    <SelectUI defaultValue="can_view_letter">
                      <SelectTrigger className="ml-auto w-[165px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {privilages.map((privilage) => (
                          <SelectItem
                            key={privilage.value}
                            value={privilage.value}
                          >
                            {privilage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectUI>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback>ብበ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          አይሲቲ መሰረተ ልማት ግንባታና አስተዳደር መሪ
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ብንያም በድሉ
                        </p>
                      </div>
                    </div>
                    <SelectUI defaultValue="can_view_letter">
                      <SelectTrigger className="ml-auto w-[165px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {privilages.map((privilage) => (
                          <SelectItem
                            key={privilage.value}
                            value={privilage.value}
                          >
                            {privilage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectUI>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 mt-4">
                <Button onClick={handleSubmit}>ዝጋ</Button>
              </DialogFooter>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
