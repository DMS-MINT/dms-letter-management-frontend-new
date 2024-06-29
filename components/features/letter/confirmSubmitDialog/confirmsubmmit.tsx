"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Select, { ActionMeta } from "react-select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { ContactType, IShareLetterFormData } from "@/typing/interface";
import { Label } from "@/components/ui/label";
import {
  getUserSignature,
  selectLetterDetails,
  selectSignatureImage,
} from "@/lib/features/letter/letterSlice";
import { shareLetter } from "@/lib/features/letter/workflow/workflowSlice";
import { SignaturePad } from "@/components/shared";
import {
  createOrSubmitLetter,
  selectAttachments,
} from "@/lib/features/letter/letterSlice";
import { letterSerializer } from "@/utils";

export default function confirmsubmmit() {
  const [isReuseSignatureOpen, setIsReuseSignatureOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState<IShareLetterFormData>({
    to: [],
    message: "",
    permissions: ["can_view_letter"],
  });

  const dispatch = useAppDispatch();
  const letterDetails = useAppSelector(selectLetterDetails);
  const attachments = useAppSelector(selectAttachments);
  const signatureImage = useAppSelector(selectSignatureImage);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    dispatch(getUserSignature(password));
  };

  useEffect(() => {
    console.log(signatureImage);
  }, [signatureImage]);

  const dispatchCreateOrSubmitLetter = () => {
    const composeFormData = letterSerializer(letterDetails, attachments);
    dispatch(createOrSubmitLetter(composeFormData));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">ወደ መዝገብ ቢሮ አስተላልፍ</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex-1 p-2">
            <DialogTitle>ያረጋግጡ</DialogTitle>
            <DialogDescription>
              እርግጠኛ ነዎት ደብዳቤውን ወደ ማህደር ቢሮ በቋሚነት ማስገባት ይፈልጋሉ
            </DialogDescription>
            <Button
              onClick={() => setIsReuseSignatureOpen(true)}
              className="mt-2"
            >
              Reuse Signature
            </Button>
          </DialogHeader>
          <SignaturePad />

          {letterDetails.signature ? (
            <DialogFooter>
              <Button type="submit" onClick={dispatchCreateOrSubmitLetter}>
                አዎ
              </Button>
              <Button className="bg-white text-black hover:bg-white">አይ</Button>
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
      <Dialog
        open={isReuseSignatureOpen}
        onOpenChange={setIsReuseSignatureOpen}
      >
        <DialogContent className="custom-dialog-content">
          <DialogHeader>
            <DialogTitle>የይለፍ ቃል ጻፍ</DialogTitle>
          </DialogHeader>
          <input
            className="w-full"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <DialogFooter>
            <Button type="submit" onClick={handlePasswordSubmit}>
              Submit
            </Button>
            <Button onClick={() => setIsReuseSignatureOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
