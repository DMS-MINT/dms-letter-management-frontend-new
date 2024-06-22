"use client";

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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { IOption, IParticipantInputSerializer } from "@/typing/interface";
import { contactToOption } from "@/utils";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { shareLetter } from "@/lib/features/letter/workflow/workflowSlice";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import React from "react";
import { ParticipantRolesEnum } from "@/typing/enum";

type Privilege = {
  value: string;
  label: string;
};

const privileges: Privilege[] = [
  { value: "can_view_letter", label: "ተመልካች" },
  { value: "can_comment_letter", label: "አስተያየት ሰጪ" },
  { value: "can_update_letter", label: "አርታዒ" },
  { value: "can_share_letter", label: "አጋሪ" },
  { value: "transfer_ownership", label: "ባለቤትነትን ያስተላልፉ" },
  { value: "remove_access", label: "ፈቃድን ያስወግዱ" },
];

interface IFormData {
  to: Array<string>;
  message: string;
  permission: Array<string>;
}

export default function ShareLetterForm() {
  const [selectedPrivilage, setSelectedPrivilage] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<IFormData>({
    to: [],
    message: "",
    permission: [],
  });
  const contacts = useAppSelector(selectContacts);
  const [options, setOptions] = useState<IOption[]>([]);
  const dispatch = useAppDispatch();
  const letterDetails = useAppSelector(selectLetterDetails);

  useEffect(() => {
    if (contacts.length > 0) {
      const options: IOption[] = contacts.map((contact) => {
        const id = uuidv4();
        const user = contact;
        const data = { id, user } as IParticipantInputSerializer;
        return contactToOption(data);
      });

      setOptions(options);
    }
  }, [contacts]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSelectChange = (
    option: SingleValue<IOption> | MultiValue<IOption>,
    actionMeta: ActionMeta<IOption>
  ) => {
    const selectedOptions = Array.isArray(option) ? option : [option];
    const to = selectedOptions.map(
      (selectedOption) => selectedOption?.value as string
    );

    setFormData((prevData: IFormData) => ({
      ...prevData,
      to,
    }));
  };

  const handlePrivilegeChange = (value: string) => {
    setSelectedPrivilage((prevPrivileges) => {
      let newPrivileges;
      if (prevPrivileges.includes(value)) {
        newPrivileges = prevPrivileges.filter((priv) => priv !== value);
      } else {
        newPrivileges = [...prevPrivileges, value];
      }

      setFormData((prevData: IFormData) => ({
        ...prevData,
        permission: newPrivileges,
      }));

      return newPrivileges;
    });
  };
  const handleMessageChange = (message: string) => {
    setFormData((prevData: IFormData) => ({ ...prevData, message }));
  };

  const handleSubmit = () => {
    dispatch(
      shareLetter({
        reference_number: letterDetails.reference_number,
        participant: formData,
      })
    );
  };

  const getLabelForValue = (value: string) => {
    const selectedPrivilege = privileges.find(
      (privilege) => privilege.value === value
    );
    return selectedPrivilege ? selectedPrivilege.label : "Select";
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
              options={options}
              placeholder=""
              className="w-full"
            />
            {formData.to.length > 0 ? (
              <SelectUI
                value={selectedPrivilage.join(",")}
                onValueChange={handlePrivilegeChange}
              >
                <SelectTrigger className="ml-auto w-[165px]">
                  <SelectValue>
                    {getLabelForValue(
                      selectedPrivilage[selectedPrivilage.length - 1]
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {privileges.map((privilege) => (
                    <SelectItem key={privilege.value} value={privilege.value}>
                      {privilege.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectUI>
            ) : null}
          </div>
          {formData.to.length > 0 ? (
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
                  {letterDetails.participants.length > 0
                    ? letterDetails.participants
                        .filter(
                          (participant) =>
                            participant.role_name ===
                            ParticipantRolesEnum["BLIND CARBON COPY RECIPIENT"]
                        )
                        .map(({ id, user }) => (
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
                            <SelectUI
                              value={selectedPrivilage.join(",")}
                              onValueChange={handlePrivilegeChange}
                            >
                              <SelectTrigger className="ml-auto w-[165px]">
                                <SelectValue>
                                  {selectedPrivilage.length > 0
                                    ? getLabelForValue(
                                        selectedPrivilage[
                                          selectedPrivilage.length - 1
                                        ]
                                      )
                                    : "Select"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {privileges.map((privilege) => (
                                  <SelectItem
                                    key={privilege.value}
                                    value={privilege.value}
                                  >
                                    {privilege.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectUI>
                          </div>
                        ))
                    : null}
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
                    <SelectUI
                      value={selectedPrivilage.join(",")}
                      onValueChange={handlePrivilegeChange}
                    >
                      <SelectTrigger className="ml-auto w-[165px]">
                        <SelectValue>
                          {selectedPrivilage.length > 0
                            ? getLabelForValue(
                                selectedPrivilage[selectedPrivilage.length - 1]
                              )
                            : "Select"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {privileges.map((privilege) => (
                          <SelectItem
                            key={privilege.value}
                            value={privilege.value}
                          >
                            {privilege.label}
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
