"use client";

import { useEffect, useRef } from "react";
import { useNoteContent } from "@/app/providers/NoteContentProvider";

type Props = {
  noteTitle: string;
  onChangeTitle: (value: string) => void;
  onEnter: (value: React.KeyboardEvent) => void;
};

const NoteTitle = ({ noteTitle, onChangeTitle, onEnter }: Props) => {
  const { isNoteContentOpen } = useNoteContent();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //фокус на заголовке
  useEffect(() => {
    const length = noteTitle.length;
    const timer = setTimeout(() => {
      textAreaRef.current?.focus();
      textAreaRef.current?.setSelectionRange(0, length);
    }, 100); // задержка, чтобы фокус не перескочил на блок с контентом

    return () => clearTimeout(timer);
  }, [isNoteContentOpen]);

  return (
    <textarea
      onChange={(e) => onChangeTitle(e.target.value)}
      onKeyDown={(e) => onEnter(e)}
      ref={textAreaRef}
      value={noteTitle}
      className={`font-bold mb-1.5 placeholder-red-500 focus:border-blue-500 focus:outline-none
             w-full text-2xl`}
    />
  );
};

export default NoteTitle;
