"use client";

import { forwardRef } from "react";

type Props = {
  createNote: (id: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string, name: string) => void;
  folderId: string;
  folderName: string;
};

const FolderMenu = forwardRef<HTMLDivElement, Props>(
  ({ createNote, renameFolder, deleteFolder, folderId, folderName }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-black p-1 text-white  absolute top-5 -right-30 w-full z-100"
      >
        <ul>
          <li>
            <button onClick={() => createNote(folderId)}>
              Создать заметку
            </button>
          </li>
          <li>
            <button onClick={() => renameFolder(folderId, folderName)}>
              Переименовать
            </button>
          </li>
          <li>
            <button onClick={() => deleteFolder(folderId, folderName)}>
              Удалить
            </button>
          </li>
        </ul>
      </div>
    );
  },
);

export default FolderMenu;
