import { useNoteContent } from "@/app/providers/NoteContentProvider";
import { useEditorActions } from "@/app/hooks/useEditorActions";

export const useOpenNoteWithSave = () => {
  const { openNoteContent } = useNoteContent();
  const { handleSaveNote } = useEditorActions();

  //открытие редактора с предварительным сохранением предыдущей заметки
  const openWithSave = (id: string) => {
    handleSaveNote();
    openNoteContent({ noteId: id });
  };

  return {
    openWithSave,
  };
};
