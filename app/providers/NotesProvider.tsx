"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Note, Tag } from "@/app/types/note";
import { defaultTags } from "@/app/data/defaultTags";

type NotesContextType = {
  notes: Note[];
  tags: Tag[];
  addNewTag: (name: string) => Tag | null;
  saveNote: (
    title: string,
    text: string,
    tagsId: string[],
    content: any,
    isDraft?: boolean,
  ) => void;
  updateNote: (
    id: string,
    title: string,
    text: string,
    tagsId: string[],
    content: any,
    isDraft?: boolean,
  ) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  //получение заметок и тегов
  useEffect(() => {
    const savedTags = localStorage.getItem("tags");
    const savedNotes = localStorage.getItem("notes");

    setTags(savedTags ? JSON.parse(savedTags) : defaultTags);
    setNotes(savedNotes ? JSON.parse(savedNotes) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Добавление нового тега
  const addNewTag = (name: string) => {
    if (!name.trim()) return null;
    const newTag = { id: crypto.randomUUID(), name };
    setTags((prev) => [...prev, newTag]);
    return newTag;
  };

  //редактирование заметки
  const updateNote = (
    id: string,
    title: string,
    text: string,
    tagsId: string[],
    content: any,
    isDraft?: boolean,
  ) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              text,
              tagsId,
              content,
              isDraft: isDraft ?? false,
              updatedAt: Date.now(),
            }
          : note,
      ),
    );
  };

  // Добавление заметки
  const saveNote = (
    title: string,
    text: string,
    tagsId: string[],
    content: any,
    isDraft?: boolean,
  ) => {
    setNotes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        text,
        tagsId,
        content,
        createdAt: Date.now(),
        isDraft: isDraft ?? false,
      },
    ]);
  };

  //удаление заметки
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        tags,
        addNewTag,
        saveNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used inside NotesProvider");
  return context;
};
