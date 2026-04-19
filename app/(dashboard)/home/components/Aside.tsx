"use client";

import { useFolders } from "@/app/providers/FoldersProvider";
import { useNotes } from "@/app/providers/NotesProvider";

const Aside = () => {
  const { folders } = useFolders();
  const { notes } = useNotes();
  return (
    <div className="border-gray-400 border-r bg-[#f8fafc] py-4 px-3.5">
      <p>Папки</p>
      <ul className="ml-2">
        {folders.map((folder) => {
          const folderNotes = folder.notes;
          return (
            <li>
              <div className="flex items-center gap-1">
                <div> {folder.icon}</div>
                <span> {folder.name}</span>
              </div>
              {folderNotes.length > 0 && (
                <div className="ml-3 flex flex-col">
                  {folderNotes.map((folderNote) => {
                    const noteTitle = notes.find(
                      (item) => item.id === folderNote,
                    )?.title;

                    return <button className="text-left">-{noteTitle}</button>;
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Aside;
