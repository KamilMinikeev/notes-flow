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
import NoteMenu from "./NoteMenu";

const Aside = () => {
  const { folders, renameFolder, deleteFolder } = useFolders();
  const { notes, saveNote, deleteNote, updateNote } = useNotes();
  const { openWithSave } = useOpenNoteWithSave();
  const { openCreateFolder } = useFolderModalStore();
  const { openNoteContent } = useNoteContent();
  const { handleSaveNote } = useEditorActions();
  const { requestDeleteConfirm } = useDeleteFolderModal();

  const [isOpenFolders, setIsOpenFolders] = useState<boolean>(true);
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [tempFolderName, setTempFolderName] = useState("");

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteName, setTempNoteName] = useState("");

  //закрытие меню папки по клику вне
  const folderMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(folderMenuRef, () => {
    setActiveFolderId(null);
  });

  //закрытие меню заметки по клику вне
  const noteMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(noteMenuRef, () => {
    setActiveNoteId(null);
  });

  //создание новой заметки с папки
  const handleOpenNoteContent = (id: string) => {
    setActiveFolderId(null);
    handleSaveNote(); //сохранение предыдущей заметки
    const newId = saveNote("Новая запись", "", [], id, null); //сохранение новой заметки
    openNoteContent({ noteId: newId });
  };

  //открытие инпута для переименования папки
  const openRenameFolderInput = (id: string, name: string) => {
    setActiveFolderId(null);
    setEditingFolderId(id);
    setTempFolderName(name);
  };

  //открытие инпута для переименования заметки
  const openRenameNoteInput = (id: string, name: string) => {
    setActiveNoteId(null);
    setEditingNoteId(id);
    setTempNoteName(name);
  };

  //переименование папки
  const handleFolderRename = () => {
    if (!editingFolderId) return;
    if (!tempFolderName.trim()) return;
    renameFolder(editingFolderId, tempFolderName);
    setEditingFolderId(null);
  };

  //переименование заметки
  const handleNoteRename = () => {
    if (!editingNoteId) return;
    if (!tempNoteName.trim()) return;

    const note = notes.find((note) => note.id === editingNoteId);

    if (!note) return;

    updateNote(
      note.id,
      tempNoteName, // новое название
      note.text,
      note.tagsId,
      note.folderId,
      note.content,
      note.isDraft,
    );

    setEditingNoteId(null);
  };

  const folderNameRef = useRef<HTMLInputElement>(null);
  const noteNameRef = useRef<HTMLInputElement>(null);

  //фокус на заголовке папки
  useEffect(() => {
    const length = tempFolderName.length;
    const timer = setTimeout(() => {
      folderNameRef.current?.focus();
      folderNameRef.current?.setSelectionRange(0, length);
    }, 100); // задержка, чтобы фокус не перескочил на блок с контентом

    return () => clearTimeout(timer);
  }, [editingFolderId]);

  //фокус на заголовке заметки
  useEffect(() => {
    const length = tempNoteName.length;
    const timer = setTimeout(() => {
      noteNameRef.current?.focus();
      noteNameRef.current?.setSelectionRange(0, length);
    }, 100); // задержка, чтобы фокус не перескочил на блок с контентом

    return () => clearTimeout(timer);
  }, [editingNoteId]);

  //сохранить наименование папки при уходе с инпута(клик вне)
  useClickOutside(folderNameRef, () => {
    handleFolderRename();
  });

  //сохранить наименование заметки при уходе с инпута(клик вне)
  useClickOutside(noteNameRef, () => {
    handleNoteRename();
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
                      value={tempFolderName}
                      onChange={(e) => setTempFolderName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleFolderRename();
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
                    renameFolder={openRenameFolderInput}
                    deleteFolder={handleDeleteFolder}
                    folderId={folder.id}
                    folderName={folder.name}
                  />
                )}
                {openFolderIds.includes(folder.id) &&
                  folderNotes.length > 0 && (
                    <div className="flex flex-col relative">
                      {folderNotes.map((folderNote) => (
                        <>
                          <button
                            key={folderNote.id}
                            onClick={() => openWithSave(folderNote.id)}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              setActiveNoteId(folderNote.id);
                            }}
                            className={`rounded-xl text-left pl-7 ${activeNoteId === folderNote.id && "border border-gray-400"}`}
                            type="button"
                          >
                            {editingNoteId === folderNote.id ? (
                              <input
                                ref={noteNameRef}
                                value={tempNoteName}
                                onChange={(e) =>
                                  setTempNoteName(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleNoteRename();
                                  }
                                }}
                                className="relative left-[-28px] top-0 border border-violet-200 rounded-2xl w-full pl-7 pr-2"
                              />
                            ) : (
                              <span> {folderNote.title}</span>
                            )}
                          </button>
                          {activeNoteId === folderNote.id && (
                            <NoteMenu
                              ref={noteMenuRef}
                              renameNote={openRenameNoteInput}
                              //deleteNote={handleDeleteNote}
                              noteId={folderNote.id}
                              noteName={folderNote.title}
                            />
                          )}
                        </>
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
