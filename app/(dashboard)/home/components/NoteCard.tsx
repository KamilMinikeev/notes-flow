"use client";

import { AiFillDelete } from "react-icons/ai";

import { useNoteContent } from "@/app/providers/NoteContentProvider";
import { useDeleteModal } from "@/app/providers/DeleteModalProvider";
import { useNotes } from "@/app/providers/NotesProvider";
import { useEditorActions } from "@/app/hooks/useEditorActions";

import { Tag } from "@/app/types/note";
import { formatNoteDate } from "@/app/utils/date";

type NoteCardProps = {
  id: string;
  title: string;
  tags: Tag[];
  selectedTags: string[];
  content: any;
  date: number;
  isDraft?: boolean;
  updatedDate?: number;
};

export default function NoteCard({
  title,
  tags,
  selectedTags,
  date,
  id,
  isDraft,
  updatedDate,
}: NoteCardProps) {
  const { openNoteContent } = useNoteContent();
  const { requestDeleteConfirm } = useDeleteModal();
  const { deleteNote } = useNotes();
  const { handleSaveNote } = useEditorActions();

  //удаление заметки
  const handleDelete = () => {
    requestDeleteConfirm({
      title,
      onConfirm: () => {
        deleteNote(id);
      },
    });
  };

  //открытие эдитора с предварительным сохранением предыдущей заметки
  const handleOpen = () => {
    handleSaveNote();
    openNoteContent(id);
  };

  return (
    <div
      onClick={handleOpen}
      className="cursor-pointer p-4 pt-0.5 border rounded-md shadow-sm bg-white hover:shadow-md transition relative flex flex-col justify-between h-30 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-xs text-gray-400 mt-2 block">
          {updatedDate
            ? `Изменено в ${formatNoteDate(updatedDate)}`
            : formatNoteDate(date)}
        </span>
        <div className="flex gap-1">
          {selectedTags.slice(0, 4).map((tagId) => {
            const tag = tags.find((t) => t.id === tagId);
            if (!tag) return null;

            return (
              <div
                key={tag.id}
                className="text-xs px-1 rounded-sm border"
                style={{ color: tag.color, borderColor: tag.color }}
              >
                {tag.name}
              </div>
            );
          })}
          {selectedTags.length > 4 && (
            <button
              onClick={() => console.log("Показать все теги")}
              className="text-xs px-1 rounded-sm border bg-gray-100"
            >
              +{selectedTags.length - 4} ещё
            </button>
          )}
        </div>
      </div>
      <h3 className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
        {title}
      </h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="w-fit border p-1 hover:scale-110 transition-transform"
      >
        <AiFillDelete />
      </button>
      {isDraft && <p className="absolute right-0.5 bottom-0.5">Черновик</p>}
    </div>
  );
}
