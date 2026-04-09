"use client";

import { useNotes } from "@/app/providers/NotesProvider";
import { useEditor } from "@/app/providers/EditorProvider";
import { useNoteContent } from "@/app/providers/NoteContentProvider";
import { useEditorKey } from "./useEditorKey";

export const useEditorActions = () => {
  const { saveNote, updateNote } = useNotes();

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

  //сброс заметки
  const resetNoteState = () => {
    setSelectedTags([]);
    setNoteTitle("Новая запись");
    setNoteText("");
    setEditorState(null);
    resetKey();
  };

  const handleSaveNote = () => {
    if (activeNoteId) {
      updateNote(
        activeNoteId,
        noteTitle,
        noteText,
        selectedTags,
        noteFolder,
        editorState,
      );
    } else {
      saveNote(noteTitle, noteText, selectedTags, noteFolder, editorState);
    }

    closeNoteContent(false, {
      id: activeNoteId,
      title: noteTitle,
      text: noteText,
      tagsId: selectedTags,
      content: editorState,
    });

    resetNoteState();
  };

  return {
    handleSaveNote,
    resetNoteState,
  };
};
