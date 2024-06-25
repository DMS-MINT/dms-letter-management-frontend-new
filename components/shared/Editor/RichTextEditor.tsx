import React from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  updateContent,
} from "@/lib/features/letter/letterSlice";
import { useDispatch } from "react-redux";
import { selectIsReadonly } from "@/lib/features/ui/uiManagerSlice";

export default function RichTextEditor() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const isReadonly = useAppSelector(selectIsReadonly);
  const dispatch = useDispatch();

  const editorEditable = useEditor({
    editable: true,
    extensions: [StarterKit, Underline],
    content: letterDetail.content ? letterDetail.content : "",
    editorProps: {
      attributes: {
        class:
          "max-w-[210mm] min-h-[297mm] p-[2.5rem] mx-auto bg-white border border-gray-300",
      },
    },
    onUpdate: ({ editor }) => dispatch(updateContent(editor.getHTML())),
  });

  const editorReadonly = useEditor({
    editable: false,
    extensions: [StarterKit, Underline],
    content: letterDetail.content ? letterDetail.content : "",
    editorProps: {
      attributes: {
        class:
          "max-w-[210mm] min-h-[297mm] p-[2.5rem] mx-auto bg-white border border-gray-300",
      },
    },
    onUpdate: ({ editor }) => dispatch(updateContent(editor.getHTML())),
  });

  if (!editorEditable || !editorReadonly) {
    return null;
  }

  return (
    <section className="border border-gray-300">
      {isReadonly ? null : <Toolbar editor={editorEditable} />}
      {isReadonly ? (
        <Canvas editor={editorReadonly} />
      ) : (
        <Canvas editor={editorEditable} />
      )}
    </section>
  );
}
