"use client";

import { useEffect } from "react";

import { createContext, useContext, useState, ReactNode } from "react";

import { useDraftModal } from "@/app/providers/DraftModalProvider";
import { useNotes } from "./NotesProvider";
import { useEditorKey } from "../hooks/useEditorKey";

type NoteData = {
  id?: string;
  title: string;
  text: string;
  tagsId: string[];
  content: any;
};

type OpenEditorParams = {
  noteId?: string;
  folderId?: string;
};

type NoteContentContextType = {
  isNoteContentOpen: boolean;
  openNoteContent: ({ noteId, folderId }: OpenEditorParams) => void;
  closeNoteContent: (noteChanges: boolean, note: NoteData) => void;
  activeNoteId: string | undefined;
  newFolderId: string | undefined;
};

const NoteContentContext = createContext<NoteContentContextType | undefined>(
  undefined,
);

export const NoteContentProvider = ({ children }: { children: ReactNode }) => {
  const [isNoteContentOpen, setIsNoteContentOpen] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | undefined>(
    undefined,
  );
  const [newFolderId, setNewFolderId] = useState<string | undefined>(undefined);

  const { setEditorKey } = useEditorKey();

  const isNewNote = !activeNoteId;

  useEffect(() => {
    if (isNewNote) {
      setEditorKey((prev) => prev + 1);
    }
  }, [isNewNote]);

  const { requestDraftConfirm } = useDraftModal();

  const { updateNote, saveNote } = useNotes();

  const saveNoteAsDraft = (note: NoteData) => {
    if (note.id) {
      updateNote(
        note.id,
        note.title,
        note.text,
        note.tagsId,
        note.content,
        true,
      );
    } else {
      saveNote(note.title, note.text, note.tagsId, note.content, true);
    }
  };

  //открытие редактора
  const openNoteContent = ({ noteId, folderId }: OpenEditorParams) => {
    setActiveNoteId(noteId ?? undefined);
    setNewFolderId(folderId ?? undefined);
    setIsNoteContentOpen(true);
  };

  //закрытие редактора
  const closeNoteContent = (noteChanges: boolean, note: NoteData) => {
    if (noteChanges) {
      requestDraftConfirm(
        // SAVE OR UPDATE DRAF
        () => {
          const noteToSave = { ...note, id: note.id ?? undefined };
          saveNoteAsDraft(noteToSave);
          setIsNoteContentOpen(false);
          setActiveNoteId(undefined);
        },

        // DISCARD DRAFT
        () => {
          setIsNoteContentOpen(false);
          setActiveNoteId(undefined);
        },
      );
    } else {
      setIsNoteContentOpen(false);
      setActiveNoteId(undefined);
    }
  };

  return (
    <NoteContentContext.Provider
      value={{
        isNoteContentOpen,
        closeNoteContent,
        openNoteContent,
        activeNoteId,
        newFolderId,
      }}
    >
      {children}
    </NoteContentContext.Provider>
  );
};

export const useNoteContent = () => {
  const context = useContext(NoteContentContext);
  if (!context) {
    throw new Error("useNoteContent must be used inside NoteContentProvider");
  }

  return context;
};
