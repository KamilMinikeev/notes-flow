"use client";
import { useEffect, useRef } from "react";

import { useNoteContent } from "@/app/providers/NoteContentProvider";

type Props = {
  noteTitle: string;
  onChangeTitle: (value: string) => void;
};

export default function NoteInput({ noteTitle, onChangeTitle }: Props) {
  const { isNoteContentOpen } = useNoteContent();

  const inputRef = useRef<HTMLInputElement>(null);

  //фокус на инпуте
  useEffect(() => {
    const length = noteTitle.length;
    const timer = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(length, length);
    }, 100); // задержка, чтобы фокус не перескочил на блок с контентом

    return () => clearTimeout(timer);
  }, [isNoteContentOpen, noteTitle]);

  return (
    <input
      onChange={(e) => onChangeTitle(e.target.value)}
      ref={inputRef}
      value={noteTitle}
      className={`font-bold mb-1.5 placeholder-red-500 focus:border-blue-500 focus:outline-none
             w-full`}
      type="text"
    />
  );
}
