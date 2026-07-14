"use client";

import { forwardRef } from "react";

type Props = {
  renameNote: (id: string, name: string) => void;
  //deleteNote: (id: string, name: string) => void;
  noteId: string;
  noteName: string;
};

const NoteMenu = forwardRef<HTMLDivElement, Props>(
  ({ renameNote, noteId, noteName }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-black p-1 text-white  absolute top-5 -right-30 w-full z-100"
      >
        <ul>
          <li>
            <button onClick={() => renameNote(noteId, noteName)}>
              Переименовать
            </button>
          </li>
          {/* <li>
            <button onClick={() => deleteNote(noteId, noteName)}>
              Удалить
            </button>
          </li> */}
        </ul>
      </div>
    );
  },
);

export default NoteMenu;
