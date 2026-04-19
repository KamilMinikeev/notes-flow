"use client";

import { useState } from "react";

import { ChevronRight, Plus } from "lucide-react";

import { useFolders } from "@/app/providers/FoldersProvider";
import { useNotes } from "@/app/providers/NotesProvider";

import { useOpenNoteWithSave } from "@/app/hooks/useOpenNoteWithSave";

const Aside = () => {
  const { folders } = useFolders();
  const { notes } = useNotes();
  const { openWithSave } = useOpenNoteWithSave();

  const [isOpenFolders, setIsOpenFolders] = useState<boolean>(false);
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([]);

  return (
    <div className="border-gray-400 border-r bg-[#f8fafc] py-4 px-3.5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpenFolders(!isOpenFolders)}
          className="flex items-center text-[#62748e] gap-0.5"
        >
          <ChevronRight
            className={`h-3 w-3 transition ${isOpenFolders && "rotate-90"}`}
          />
          <span className="text-xs font-semibold uppercase ">Папки</span>
        </button>
        <button className="h-6 w-6">
          <Plus className="h-3 w-3" />
        </button>
      </div>
      {isOpenFolders && (
        <ul>
          {folders.map((folder) => {
            //заметки определенной папки
            const folderNotes = notes.filter((n) => n.folderId === folder.id);
            return (
              <li className="" key={folder.id}>
                <button
                  onClick={() => {
                    setOpenFolderIds((prev) =>
                      prev.includes(folder.id)
                        ? prev.filter((id) => id !== folder.id)
                        : [...prev, folder.id],
                    );
                  }}
                  className="pl-2 flex items-center transition gap-0.5 w-full rounded-xl hover:bg-gray-200"
                >
                  <ChevronRight
                    className={`h-3 w-3 transition ${openFolderIds.includes(folder.id) && "rotate-90"}`}
                  />
                  <div> {folder.icon}</div>
                  <span> {folder.name}</span>
                </button>
                {openFolderIds.includes(folder.id) &&
                  folderNotes.length > 0 && (
                    <div className="flex flex-col">
                      {folderNotes.map((folderNote) => (
                        <button
                          key={folderNote.id}
                          onClick={() => openWithSave(folderNote.id)}
                          className="text-left pl-7"
                          type="button"
                        >
                          {folderNote.title}
                        </button>
                      ))}
                    </div>
                  )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Aside;
