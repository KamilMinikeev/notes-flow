"use client";

import { useNotes } from "@/app/providers/NotesProvider";
import { useEditor } from "@/app/providers/EditorProvider";
import { useNoteContent } from "@/app/providers/NoteContentProvider";
import { useEditorActions } from "@/app/hooks/useEditorActions";
import { useEditorKey } from "@/app/hooks/useEditorKey";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import TagsModal from "./TagsModal/TagsModal";
import NoteEditor from "./NoteEditor/NoteEditor";
import NoteInput from "./NoteInput/NoteInput";
import NoteTitle from "./NoteTitle";
import NoteText from "./NoteText";
import NoteFolder from "./NoteFolder";

export default function NoteContent() {
  const { closeNoteContent, activeNoteId } = useNoteContent();

  const { tags } = useNotes();

  const { handleSaveNote, resetNoteState, hasChanges } = useEditorActions();

  const {
    noteTitle,
    setNoteTitle,
    noteText,
    setNoteText,
    selectedTags,
    setSelectedTags,
    editorState,
    setEditorState,
    noteFolder,
    setNoteFolder,
  } = useEditor();

  const { tagsModalKey } = useEditorKey();
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  //добавление тегов в заметку
  const addSelectedTags = (tags: string[]) => {
    setSelectedTags(tags);
    setIsTagsModalOpen(false);
  };

  //удаление тегов из заметки
  const deleteSelectedTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  //добавление папки в заметку
  const addFolder = (id: string) => {
    setNoteFolder(id);
  };

  const handleClose = () => {
    closeNoteContent(hasChanges, {
      id: activeNoteId,
      title: noteTitle,
      text: noteText,
      tagsId: selectedTags,
      content: editorState,
    });

    resetNoteState();
  };

  const textRef = useRef<HTMLTextAreaElement>(null);

  //фокус на тексте при переходе с заголовка
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      textRef.current?.focus();
    }
  };

  return (
    <>
      <div className={`flex flex-col relative bg-white w-full p-6 h-full`}>
        <NoteTitle
          noteTitle={noteTitle}
          onChangeTitle={setNoteTitle}
          onEnter={handleKeyDown}
        />

        <div className="flex items-start">
          <NoteFolder noteFolder={noteFolder} addFolder={addFolder} />
          {selectedTags.length ? (
            <div className="flex gap-2.5">
              <div className="flex gap-1.5">
                {selectedTags.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  if (!tag) return null;
                  return (
                    <div
                      key={tag.id}
                      style={{ borderColor: tag.color }}
                      className="border rounded-sm p-1 flex items-center gap-2.5"
                    >
                      <div style={{ color: tag.color }}>{tag.name}</div>
                      <button onClick={() => deleteSelectedTag(tagId)}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                className="border rounded-sm p-2"
                onClick={() => setIsTagsModalOpen(true)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsTagsModalOpen(true)}
              className={`w-fit border rounded-2xl font-bold`}
            >
              Добавить тег +
            </button>
          )}
        </div>

        {/* <NoteEditor
          key={isNewNote ? editorKey : undefined}
          onChangeEditor={setEditorState}
          initialContent={currentNote?.content ?? null}
        /> */}

        <NoteText
          noteText={noteText}
          onChangeText={setNoteText}
          ref={textRef}
        />

        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={() => handleClose()}
            className="px-4 py-2 rounded-lg border border-zinc-500 text-gray-500 hover:text-black"
          >
            Отмена
          </button>

          <button
            disabled={!hasChanges}
            onClick={() => handleSaveNote()}
            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-black disabled:cursor-default"
          >
            Сохранить заметку
          </button>
        </div>
      </div>

      <TagsModal
        className={isTagsModalOpen ? "flex" : "hidden"}
        onCloseTagsModal={() => setIsTagsModalOpen(false)}
        initialSelectedTags={selectedTags}
        addSelectedTags={addSelectedTags}
        key={tagsModalKey}
      />
    </>
  );
}
