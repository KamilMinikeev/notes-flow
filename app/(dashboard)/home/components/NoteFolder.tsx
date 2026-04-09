import { Folder } from "lucide-react";

import { useFolders } from "@/app/providers/FoldersProvider";
import { useState } from "react";

import FolderModal from "./FolderModal";

type NoteFolderProps = {
  addFolder: (id: string) => void;
  noteFolder: string | null;
};

const NoteFolder = ({ addFolder, noteFolder }: NoteFolderProps) => {
  const { folders } = useFolders();

  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const showFolders = folders.slice(3);

  return (
    <>
      <div className="flex flex-col w-35 relative">
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
                    onClick={() => addFolder(folder.id)}
                    className="w-full text-left text-sm"
                  >
                    {folder.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="bg-amber-100 w-full"
              onClick={() => setIsOpenModal(true)}
            >
              +Новая папка
            </button>
          </div>
        )}
      </div>
      <FolderModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
};

export default NoteFolder;
