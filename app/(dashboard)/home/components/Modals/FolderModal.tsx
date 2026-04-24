"use client";

import { useState } from "react";

import { useFolders } from "@/app/providers/FoldersProvider";
import { useFolderModalStore } from "@/app/stores/useFolderModalStore";
import { useEditor } from "@/app/providers/EditorProvider";

const FOLDER_ICONS = [
  "📁",
  "📂",
  "🗂️",
  "📋",
  "📝",
  "💼",
  "🎨",
  "🎯",
  "💡",
  "🌟",
];
const FOLDER_COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#a855f7",
  "#06b6d4",
];

export default function FolderModal() {
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newFolderIcon, setNewFolderIcon] = useState<string>("");

  const { addNewFolder } = useFolders();
  const { closeCreateFolder, isCreateFolderOpen } = useFolderModalStore();
  const { setNoteFolder } = useEditor();

  const handleCreate = () => {
    const id = addNewFolder(newFolderName, newFolderIcon);
    setNewFolderName("");
    setNewFolderIcon("");
    if (id) {
      closeCreateFolder();
      setNoteFolder(id);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isCreateFolderOpen ? "flex" : "hidden"}`}
      >
        {/* overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={closeCreateFolder}
        />

        {/* modal */}
        <div
          className={`flex flex-col relative bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl h-full`}
        >
          <h2 className="mb-1 font-bold text-xl">Создать папку</h2>
          <p className="text-gray-700 text-sm">
            Создайте новую папку для организации заметок
          </p>
          <div className="mt-4">
            <span className="font-bold text-sm mb-1 block">Название</span>
            <div className="grid grid-cols-[80%_1fr] gap-2 w-full">
              <input
                className="bg-gray-100 rounded-sm text-sm py-2 px-3"
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Название папки"
              />

              {/* на разработку */}
              <button className=" rounded-xl h-full bg-black text-white flex text-center items-center justify-center">
                Голос
              </button>
            </div>

            {/* на разработку */}
            <div className="mt-7">
              <span className="font-bold text-sm mb-1 block">Иконка</span>
              <div className="flex gap-2 flex-wrap">
                {FOLDER_ICONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewFolderIcon(icon)}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl hover:border-violet-500 transition-colors ${
                      newFolderIcon === icon
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* на разработку */}
            <div className="mt-7">
              <span className="font-bold text-sm mb-1 block">Цвет</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeCreateFolder}
              className="px-4 py-2 rounded-lg border border-zinc-500 text-gray-500 hover:text-black"
            >
              Отмена
            </button>

            <button
              onClick={handleCreate}
              className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
