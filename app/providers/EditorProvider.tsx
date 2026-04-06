"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type EditorContextType = {
  noteTitle: string;
  setNoteTitle: React.Dispatch<React.SetStateAction<string>>;
  noteText: string;
  setNoteText: React.Dispatch<React.SetStateAction<string>>;
  editorState: any;
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  //данные редактора
  const [noteTitle, setNoteTitle] = useState("Новая запись");
  const [noteText, setNoteText] = useState("");
  const [editorState, setEditorState] = useState<any>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <EditorContext.Provider
      value={{
        noteTitle,
        setNoteTitle,
        noteText,
        setNoteText,
        editorState,
        setEditorState,
        selectedTags,
        setSelectedTags,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used inside EditorProvider");
  }

  return context;
};
