import { Folder } from "lucide-react";

import { useFolders } from "@/app/providers/FoldersProvider";
import { useState, useEffect, useRef } from "react";

import FolderModal from "../Modals/FolderModal";

import { useFolderModalStore } from "@/app/stores/useFolderModalStore";

type NoteFolderProps = {
  addFolder: (id: string) => void;
  noteFolder: string | null;
};

const NoteFolder = ({ addFolder, noteFolder }: NoteFolderProps) => {
  const { folders } = useFolders();

  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const { openCreateFolder } = useFolderModalStore();

  const showFolders = folders.slice(3);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(event.target as Node)) {
        setIsOpenSelect(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={ref} className="flex flex-col w-35 relative">
        <button
          onClick={() => setIsOpenSelect(!isOpenSelect)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 p-2 bg-[#f9fafb]"
        >
          <Folder className="w-4 h-4 text-gray-700" />
          <span className="text-gray-700">
            {noteFolder
              ? (folders.find((item) => item.id === noteFolder)?.name ??
                "Без папки")
              : "Без папки"}
          </span>
        </button>
        {isOpenSelect && (
          <div className="border absolute left-0 top-full w-full bg-white text-sm">
            {folders.length > 3 && (
              <input
                className="w-full text-sm"
                type="text"
                placeholder="Поиск..."
              />
            )}
            <ul className="max-h-25 overflow-auto border-t">
              {folders.map((folder) => (
                <li className="border-b w-full px-1 hover:bg-violet-300">
                  <button
                    onClick={() => {
                      addFolder(folder.id);
                      setIsOpenSelect(!isOpenSelect);
                    }}
                    className="w-full text-left text-sm"
                  >
                    {folder.name}
                  </button>
                </li>
              ))}
            </ul>
            <button className="bg-amber-100 w-full" onClick={openCreateFolder}>
              +Новая папка
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NoteFolder;
