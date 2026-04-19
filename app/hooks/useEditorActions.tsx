"use client";

import { useEffect, useRef } from "react";

import { useNotes } from "@/app/providers/NotesProvider";
import { useEditor } from "@/app/providers/EditorProvider";
import { useNoteContent } from "@/app/providers/NoteContentProvider";
import { useEditorKey } from "./useEditorKey";
import { useFolders } from "../providers/FoldersProvider";

export const useEditorActions = () => {
  const { saveNote, updateNote, notes } = useNotes();

  const {
    noteTitle,
    noteText,
    selectedTags,
    noteFolder,
    editorState,
    setNoteTitle,
    setNoteText,
    setSelectedTags,
    setNoteFolder,
    setEditorState,
  } = useEditor();

  const { activeNoteId, closeNoteContent } = useNoteContent();

  const { resetKey } = useEditorKey();

  const { setFolders } = useFolders();

  //Отслеживание изменения заметки
  const currentNote = notes.find((n) => n.id === activeNoteId) ?? null;

  useEffect(() => {
    if (currentNote) {
      setNoteTitle(currentNote.title);
      setNoteText(currentNote.text);
      setSelectedTags(currentNote.tagsId);
      setEditorState(currentNote.content);
      setNoteFolder(currentNote.folderId);
    } else {
      // режим создания
      setNoteTitle("Новая запись");
      setNoteText("");
      setSelectedTags([]);
      setEditorState(null);
      setNoteFolder(null);
    }
  }, [currentNote]);

  const initialStateRef = useRef<{
    title: string;
    text: string;
    selectedTags: string[];
    content: any;
    folderId: string | null;
  } | null>(null);

  useEffect(() => {
    if (currentNote) {
      initialStateRef.current = {
        title: currentNote.title,
        text: currentNote.text,
        selectedTags: currentNote.tagsId,
        content: currentNote.content,
        folderId: currentNote.folderId,
      };
    } else {
      initialStateRef.current = {
        title: "Новая запись",
        text: "",
        selectedTags: [],
        content: null,
        folderId: null,
      };
    }
  }, [currentNote]);

  const hasChanges =
    noteTitle !== initialStateRef.current?.title ||
    noteText !== initialStateRef.current?.text ||
    noteFolder !== initialStateRef.current?.folderId ||
    selectedTags.length !== initialStateRef.current?.selectedTags.length ||
    !selectedTags.every((id) =>
      initialStateRef.current?.selectedTags.includes(id),
    ) ||
    JSON.stringify(editorState) !==
      JSON.stringify(initialStateRef.current?.content);

  //сброс заметки
  const resetNoteState = () => {
    setSelectedTags([]);
    setNoteTitle("Новая запись");
    setNoteText("");
    setEditorState(null);
    setNoteFolder(null);
    resetKey();
  };

  const handleSaveNote = () => {
    if (hasChanges) {
      const isEdit = Boolean(activeNoteId);

      const id = isEdit
        ? activeNoteId!
        : saveNote(noteTitle, noteText, selectedTags, noteFolder, editorState);

      if (isEdit) {
        updateNote(
          id,
          noteTitle,
          noteText,
          selectedTags,
          noteFolder,
          editorState,
        );
      }

      closeNoteContent(false, {
        id,
        title: noteTitle,
        text: noteText,
        tagsId: selectedTags,
        content: editorState,
      });

      resetNoteState();
    }
  };

  return {
    handleSaveNote,
    resetNoteState,
    hasChanges,
  };
};
