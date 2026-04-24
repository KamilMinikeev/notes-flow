"use client";

import { useState, useEffect, useRef } from "react";

import { ChevronRight, Plus } from "lucide-react";

import { useFolders } from "@/app/providers/FoldersProvider";
import { useNotes } from "@/app/providers/NotesProvider";
import { useNoteContent } from "@/app/providers/NoteContentProvider";
import { useEditorActions } from "@/app/hooks/useEditorActions";
import { useDeleteFolderModal } from "@/app/providers/DeleteFolderModalProvider";

import { useFolderModalStore } from "@/app/stores/useFolderModalStore";
import { useOpenNoteWithSave } from "@/app/hooks/useOpenNoteWithSave";
import { useClickOutside } from "@/app/hooks/useClickOutside";

import FolderMenu from "./FolderMenu";

const Aside = () => {
  const { folders, renameFolder, deleteFolder } = useFolders();
  const { notes, saveNote, deleteNote } = useNotes();
  const { openWithSave } = useOpenNoteWithSave();
  const { openCreateFolder } = useFolderModalStore();
  const { openNoteContent } = useNoteContent();
  const { handleSaveNote } = useEditorActions();
  const { requestDeleteConfirm } = useDeleteFolderModal();

  const [isOpenFolders, setIsOpenFolders] = useState<boolean>(false);
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  //закрытие меню папки по клику вне
  const folderMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(folderMenuRef, () => {
    setActiveFolderId(null);
  });

  //создание новой заметки с папки
  const handleOpenNoteContent = (id: string) => {
    setActiveFolderId(null);
    handleSaveNote(); //сохранение предыдущей заметки
    const newId = saveNote("Новая запись", "", [], id, null); //сохранение новой заметки
    openNoteContent({ noteId: newId });
  };

  //открытие инпута для переименования папки
  const openRenameInput = (id: string, name: string) => {
    setActiveFolderId(null);
    setEditingFolderId(id);
    setTempName(name);
  };

  //переименование папки
  const handleRename = () => {
    if (!editingFolderId) return;
    if (!tempName.trim()) return;
    renameFolder(editingFolderId, tempName);
    setEditingFolderId(null);
  };

  const folderNameRef = useRef<HTMLInputElement>(null);

  //фокус на заголовке папки
  useEffect(() => {
    const length = tempName.length;
    const timer = setTimeout(() => {
      folderNameRef.current?.focus();
      folderNameRef.current?.setSelectionRange(0, length);
    }, 100); // задержка, чтобы фокус не перескочил на блок с контентом

    return () => clearTimeout(timer);
  }, [editingFolderId]);

  //сохранить наименование папки при уходе с инпута(клик вне)
  useClickOutside(folderNameRef, () => {
    handleRename();
  });

  //удаление папки и заметок внутри
  const handleDeleteFolder = (id: string, title: string) => {
    const notesInFolder = notes.filter((note) => note.folderId === id);

    requestDeleteConfirm({
      title,
      onConfirm: () => {
        deleteFolder(id);
        notesInFolder.forEach((note) => deleteNote(note.id));
      },
    });
  };

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
        <button onClick={openCreateFolder} className="h-6 w-6">
          <Plus className="h-3 w-3" />
        </button>
      </div>
      {isOpenFolders && (
        <ul>
          {folders.map((folder) => {
            //заметки определенной папки
            const folderNotes = notes.filter((n) => n.folderId === folder.id);
            return (
              <li className="relative" key={folder.id}>
                <button
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setActiveFolderId(folder.id);
                  }}
                  onClick={() => {
                    setOpenFolderIds((prev) =>
                      prev.includes(folder.id)
                        ? prev.filter((id) => id !== folder.id)
                        : [...prev, folder.id],
                    );
                  }}
                  className={`pl-2 flex items-center transition gap-0.5 w-full rounded-xl hover:bg-gray-200 ${activeFolderId === folder.id && "border border-gray-400"}`}
                >
                  <ChevronRight
                    className={`h-3 w-3 transition ${openFolderIds.includes(folder.id) && "rotate-90"}`}
                  />
                  <div> {folder.icon}</div>
                  {editingFolderId === folder.id ? (
                    <input
                      ref={folderNameRef}
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRename();
                        }
                      }}
                      className="absolute left-0 top-0 border border-violet-200 rounded-2xl w-full pl-12 pr-2"
                    />
                  ) : (
                    <span> {folder.name}</span>
                  )}
                </button>
                {activeFolderId === folder.id && (
                  <FolderMenu
                    ref={folderMenuRef}
                    createNote={handleOpenNoteContent}
                    renameFolder={openRenameInput}
                    deleteFolder={handleDeleteFolder}
                    folderId={folder.id}
                    folderName={folder.name}
                  />
                )}
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
