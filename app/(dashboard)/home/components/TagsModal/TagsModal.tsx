"use client";

import styles from "./tags-modal.module.scss";

import { useState } from "react";
import { useNotes } from "@/app/providers/NotesProvider";

import { Tag } from "@/app/types/note";

type Props = {
  onCloseTagsModal: () => void;
  initialSelectedTags: string[];
  addSelectedTags: (tags: string[]) => void;
  className?: string;
};

export default function TagsModal({
  onCloseTagsModal,
  initialSelectedTags,
  addSelectedTags,
  className,
}: Props) {
  const { tags, addNewTag } = useNotes();
  const [tagValue, setTagValue] = useState("");
  const [draftSelectedTags, setDraftSelectedTags] =
    useState<string[]>(initialSelectedTags);

  const [isTagNotSelected, setIsTagNotSelected] = useState(false); //существующий тег выбран
  const [pinnedTagIds, setPinnedTagIds] = useState<string[]>([]); // новые добавленные теги

  //Добавление нового тега из ввода в инпуте
  const handleAddTag = (tagValue: string) => {
    const newTag = addNewTag(tagValue);

    if (!newTag) return;

    setPinnedTagIds((prev) => [newTag.id, ...prev]);

    setDraftSelectedTags((prev) => [...prev, newTag.id]);
    setTagValue("");
  };

  //сортировка тегов при добавлении нового
  const orderedTags =
    pinnedTagIds.length > 0
      ? [
          ...(pinnedTagIds
            .map((id) => tags.find((t) => t.id === id))
            .filter(Boolean) as Tag[]),
          ...tags.filter((t) => !pinnedTagIds.includes(t.id)),
        ]
      : tags;

  //Выбор тегов для заметки
  const toggleTag = (id: string) => {
    setIsTagNotSelected(false);
    setDraftSelectedTags((prev) =>
      prev.includes(id)
        ? prev.filter((tagName) => tagName !== id)
        : [...prev, id],
    );
  };

  //Добавление существующего тега для заметки
  const handleAddSelectedTags = () => {
    if (draftSelectedTags.length === 0) {
      setIsTagNotSelected(true);
    } else {
      addSelectedTags(draftSelectedTags);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCloseTagsModal}
      />

      {/* modal */}
      <div
        className={`flex flex-col relative bg-white w-full max-w-4xl rounded-2xl p-6 shadow-xl h-full`}
      >
        <h2 className="font-bold mb-4">Добавьте тег:</h2>
        <div className={`${styles.tagsModalInputInner} mb-4`}>
          <input
            onChange={(e) => setTagValue(e.target.value)}
            value={tagValue}
            className={`${styles.tagsModalInput}`}
            placeholder="Введите новый тег..."
            type="text"
          />
          <button
            onClick={() => handleAddTag(tagValue)}
            className={`${styles.tagsModalInputBtn}`}
          >
            +
          </button>
        </div>
        <div
          className={`${styles.tagsModalExistingTagsInner} flex-1 border relative ${isTagNotSelected ? styles.error : ""}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Существующие теги:</h3>
            <button className="text-xs text-violet-500 underline">
              Редактировать мои теги
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {orderedTags.map((tag) => (
              <button
                onClick={() => toggleTag(tag.id)}
                className={`border rounded-sm p-2 ${
                  draftSelectedTags.includes(tag.id)
                    ? "bg-black text-white"
                    : ""
                }`}
                key={tag.id}
              >
                {tag.name}
              </button>
            ))}
          </div>
          {isTagNotSelected && (
            <p className="absolute text-red-500 bottom-[5px] right-[5px]">
              Выберите тег!
            </p>
          )}
        </div>
        <div className="flex gap-1.5 justify-end mt-2">
          <button
            onClick={onCloseTagsModal}
            className={`${styles.tagsModalBtn} ${styles.tagsModalCloseBtn} font-bold`}
          >
            Отмена
          </button>
          <button
            onClick={handleAddSelectedTags}
            className={`${styles.tagsModalBtn} ${styles.tagsModalAddBtn} font-bold`}
          >
            Добавить тег
          </button>
        </div>
      </div>
    </div>
  );
}
