import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type EditorTool = {
  value: string;
  action: React.MouseEventHandler<HTMLButtonElement>;
  icon: JSX.Element;
  isActive: boolean;
};

export default function Toolbar({ editor }: { editor: Editor }) {
  const editorTools: EditorTool[] = [
    {
      value: "undo",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().undo().run();
      },
      icon: <Undo className="h-4 w-4" />,
      isActive: editor.isActive("undo"),
    },
    {
      value: "redo",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().redo().run();
      },
      icon: <Redo className="h-4 w-4" />,
      isActive: editor.isActive("redo"),
    },
    {
      value: "bold",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleBold().run();
      },
      icon: <Bold className="h-4 w-4" />,
      isActive: editor.isActive("bold"),
    },
    {
      value: "underline",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleUnderline().run();
      },
      icon: <Underline className="h-4 w-4" />,
      isActive: editor.isActive("underline"),
    },
    {
      value: "italic",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleItalic().run();
      },
      icon: <Italic className="h-4 w-4" />,
      isActive: editor.isActive("italic"),
    },
    {
      value: "header_1",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
      icon: <Heading1 className="h-4 w-4" />,
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      value: "header_2",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
      icon: <Heading2 className="h-4 w-4" />,
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      value: "header_3",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: 3 }).run();
      },
      icon: <Heading3 className="h-4 w-4" />,
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      value: "header_4",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: 4 }).run();
      },
      icon: <Heading4 className="h-4 w-4" />,
      isActive: editor.isActive("heading", { level: 4 }),
    },
    {
      value: "header_5",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: 5 }).run();
      },
      icon: <Heading5 className="h-4 w-4" />,
      isActive: editor.isActive("heading", { level: 5 }),
    },
    {
      value: "header_6",
      action: (e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: 6 }).run();
      },
      icon: <Heading6 className="h-4 w-4" />,
      isActive: editor.isActive("heading", { level: 6 }),
    },
  ];

  return (
    <div className="p-1 flex gap-1">
      {editorTools.map(({ value, action, icon, isActive }) => (
        <Button
          key={value}
          variant="ghost"
          size="icon"
          onClick={action}
          className={isActive ? "bg-gray-200" : ""}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}
