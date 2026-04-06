"use client";

import NoteCard from "./NoteCard";
import { useNotes } from "@/app/providers/NotesProvider";

import Link from "next/link";

export default function LastNotes() {
  const { notes, tags } = useNotes();
  const notesToShow = notes.slice(-3); // берём только 2 последние

  return (
    <div className="border-gray-400 border-r py-4 px-3.5 flex flex-col justify-between">
      <div>
        <h2 className="font-bold mb-2 text-gray-700">Последние заметки</h2>
        <div className="flex flex-col gap-4 w-full">
          {notesToShow.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              selectedTags={note.tagsId}
              tags={tags}
              content={note.content}
              date={note.createdAt}
              id={note.id}
              isDraft={note.isDraft}
              updatedDate={note.updatedAt}
            />
          ))}
        </div>
      </div>

      <Link
        className="flex items-center justify-center text-center w-full h-12 px-4 bg-violet-500 text-white font-bold rounded-md hover:bg-violet-600 transition mt-4"
        href="/notes"
      >
        Все записи
      </Link>
    </div>
  );
}
