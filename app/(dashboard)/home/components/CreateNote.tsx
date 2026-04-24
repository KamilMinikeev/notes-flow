"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import NoteButton from "./NoteButton/NoteButton";
import NoteContent from "./Editor/NoteContent";
import { useNoteContent } from "@/app/providers/NoteContentProvider";

const CreateNote = () => {
  const { isNoteContentOpen } = useNoteContent();

  return (
    <div className="w-full h-full">
      {isNoteContentOpen ? (
        <NoteContent />
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
          <div className="rounded-[50%] w-18 h-18 bg-violet-100 flex justify-center items-center">
            <Plus className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-600">
            Создайте новую заметку и начните путь к осознанности
          </p>
          <NoteButton />
        </div>
      )}
    </div>
  );
};

export default CreateNote;
