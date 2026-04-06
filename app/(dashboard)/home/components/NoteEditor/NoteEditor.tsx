"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import styles from "./note-editor.module.scss";

type Props = {
  onChangeEditor: (json: any) => void;
  initialContent?: any;
};

export default function NoteEditor({ onChangeEditor, initialContent }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "Начните писать заметку...",
      }),
    ],
    content: initialContent || "<p></p>",
    onUpdate: ({ editor }) => {
      onChangeEditor(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    immediatelyRender: false, // ключевой параметр для SSR
  });

  const addImage = (url: string) => {
    if (!editor) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  if (!editor) return null;

  return (
    <div
      className={`${styles.noteEditorInner} border rounded-xl p-4 flex-1 mt-2 relative min-h-[150px] h-full`}
    >
      <div
        className={`${styles.noteEditorAddImage} flex gap-2 mb-2 absolute top-0 right-0 h-2`}
      >
        <button
          onClick={() => {
            const url = prompt("Вставьте URL изображения");
            if (url) addImage(url);
          }}
          className="px-2 py-1 border rounded h-full"
        >
          Вставить картинку
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
