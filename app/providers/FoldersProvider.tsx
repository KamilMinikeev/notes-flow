"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

import type { Folder } from "../types/folder";

type FoldersContextType = {
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  addNewFolder: (name: string, icon: string) => void;
};

const FoldersContext = createContext<FoldersContextType | undefined>(undefined);

export const FoldersProvider = ({ children }: { children: ReactNode }) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  //получение папок
  useEffect(() => {
    const savedFolders = localStorage.getItem("folders");
    setFolders(savedFolders ? JSON.parse(savedFolders) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  // Добавление папки
  const addNewFolder = (name: string, icon: string) => {
    setFolders((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        icon,
      },
    ]);
  };

  return (
    <FoldersContext.Provider
      value={{
        folders,
        setFolders,
        addNewFolder,
      }}
    >
      {children}
    </FoldersContext.Provider>
  );
};

export const useFolders = () => {
  const context = useContext(FoldersContext);
  if (!context)
    throw new Error("useFolders must be used inside FoldersProvider");
  return context;
};
