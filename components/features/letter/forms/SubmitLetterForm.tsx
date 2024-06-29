"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { SignaturePad } from "@/components/shared";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectAttachments,
  selectLetterDetails,
  signLetter,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import { useEffect, useState } from "react";
import { VerifyUserForm } from "@/components/features/user";
import { letterSerializer } from "@/utils";
import { submitLetter } from "@/lib/features/letter/workflow/workflowSlice";
import {
  resetDefaultSignature,
  selectDefaultSignature,
} from "@/lib/features/authentication/authSlice";

export default function SubmitLetterForm() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const attachments = useAppSelector(selectAttachments);
  const default_signature = useAppSelector(selectDefaultSignature);
  const [signature, setSignature] = useState<File>();
  const dispatch = useAppDispatch();

  const handleSignatureChange = (file: File) => {
    setSignature(file);
  };

  const handleSubmit = () => {
    const serializedLetter = letterSerializer(letterDetails, attachments);
    console.log(serializedLetter);

    // dispatch(
    //   updateLetter({
    //     reference_number: letterDetails.reference_number,
    //     letter: serializedLetter,
    //   })
    // );

    // dispatch(submitLetter(letterDetails.reference_number));
    // dispatch(resetDefaultSignature());
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>ወደ መዝገብ ቢሮ አስተላልፍ</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[45rem] max-w-[45rem] ">
        <DialogHeader className="gap-2">
          <DialogTitle>ወደ መዝገብ ቢሮ አስተላልፍ</DialogTitle>
          <DialogDescription>
            እርግጠኛ ነዎት ደብዳቤውን ወደ ወደ መዝገብ ቢሮ በቋሚነት ማስገባት ይፈልጋሉ
          </DialogDescription>
          {default_signature ? (
            <div className="flex items-center">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${default_signature}`}
                className="bg-white w-80"
              />
            </div>
          ) : (
            <SignaturePad handleSignatureChange={handleSignatureChange} />
          )}
        </DialogHeader>
        <DialogFooter>
          <VerifyUserForm />
          <DialogClose asChild>
            <Button className="bg-white text-black hover:bg-white">አይ</Button>
          </DialogClose>
          <Button
            disabled={signature || default_signature ? false : true}
            type="submit"
            onClick={handleSubmit}
          >
            አዎ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
