"use client";

import { useNotes } from "@/app/providers/NotesProvider";

const Aside = () => {
  const { noteTitle } = useNotes();
  return (
    <div className="border-gray-400 border-r bg-[#f8fafc] py-4 px-3.5">
      <p>Папки</p>
      <button className="border p-2" onClick={() => alert(noteTitle)}>
        тест
      </button>
    </div>
  );
};

export default Aside;
