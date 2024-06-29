"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Select, { ActionMeta } from "react-select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { ContactType, IShareLetterFormData } from "@/typing/interface";
import { Label } from "@/components/ui/label";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { shareLetter } from "@/lib/features/letter/workflow/workflowSlice";

export default function ShareLetterForm() {
  const [formData, setFormData] = useState<IShareLetterFormData>({
    to: [],
    message: "",
    permissions: ["can_view_letter"],
  });
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();
  const letterDetails = useAppSelector(selectLetterDetails);

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
      <DialogContent className="min-w-[40rem] max-w-[40rem] max-h-[40rem] flex flex-col">
        <DialogHeader className="flex-1 p-2">
          <DialogTitle>የደብዳቤ መምሪያ</DialogTitle>
          <div className="flex items-center gap-1.5 py-3">
            <Label className="w-5">ለ</Label>
            <Select
              isMulti
              onChange={handleSelectChange}
              options={contacts.filter(
                (contact) => contact.user_type === "member"
              )}
              placeholder=""
              getOptionLabel={getLabel}
              getOptionValue={getValue}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Label>መልእክት ማስቀመጫ</Label>
            <Textarea
              id="መልእክት ማስቀመጫ"
              className="bg-gray-100"
              value={formData.message || ""}
              onChange={(e) => handleMessageChange(e.target.value)}
            />
          </div>
        </DialogHeader>
        <DialogFooter className="">
          <Button variant={"outline"}>ሰርዝ</Button>
          <Button onClick={handleSubmit}>ምራ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
