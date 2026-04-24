"use client";

import { useNoteContent } from "@/app/providers/NoteContentProvider";
import styles from "./note-button.module.scss";

export default function NoteButton() {
  const { openNoteContent } = useNoteContent();

  return (
    <button
      onClick={() => openNoteContent({})}
      className={`${styles.noteButton} 
        max-w-80
        w-full
        py-4
        rounded-2xl
        bg-linear-to-br from-violet-600 to-fuchsia-600
        text-white
        text-lg
        font-semibold
        hover:bg-zinc-800
        hover:scale-101
        transition`}
    >
      Сделать запись
    </button>
  );
}
