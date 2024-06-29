"use client";
import { type Editor, EditorContent } from "@tiptap/react";
import SignaturePad from "../SignaturePad";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";

export default function Canvas({ editor }: { editor: Editor }) {
  const letterDetail = useAppSelector(selectLetterDetails);

  return (
    <section className="py-4 bg-slate-100">
      <div className="relative max-w-[210mm] min-h-[280mm] mx-auto">
        <EditorContent
          style={{ whiteSpace: "pre-line" }}
          editor={editor}
          className="editor"
        />
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${letterDetail.signature}`}
          className="bg-white mx-auto absolute w-80 bottom-1 right-1"
        />
      </div>
    </section>
  );
}
