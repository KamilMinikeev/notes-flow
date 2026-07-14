"use client";

import { useEffect, useRef } from "react";
import { useNoteContent } from "@/app/providers/NoteContentProvider";
import { useNotes } from "@/app/providers/NotesProvider";
import { useEditorActions } from "@/app/hooks/useEditorActions";

type Props = {
  noteTitle: string;
  onChangeTitle: (value: string) => void;
  onEnter: (value: React.KeyboardEvent) => void;
};

const NoteTitle = ({ noteTitle, onChangeTitle, onEnter }: Props) => {
  const { isNoteContentOpen, openNoteContent, activeNoteId } = useNoteContent();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //фокус на заголовке
  useEffect(() => {
    const textarea = textAreaRef.current;
    const timer = setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(0, textarea.value.length);
      }
    }, 100); // задержка, чтобы фокус не перескочил на блок с контентом

    return () => clearTimeout(timer);
  }, [isNoteContentOpen, activeNoteId]);

  return (
    <textarea
      onChange={(e) => onChangeTitle(e.target.value)}
      onKeyDown={(e) => onEnter(e)}
      ref={textAreaRef}
      value={noteTitle}
      className={`font-bold mb-2.5 placeholder-red-500 focus:outline-none
             w-full text-2xl ${noteTitle.length < 1 && "border-b-red-500 border-b"}`}
    />
  );
};

export default NoteTitle;
