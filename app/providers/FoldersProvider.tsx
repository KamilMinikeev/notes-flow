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
  addNewFolder: (name: string, icon: string) => string | null;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
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
    const sameName = folders.find((folder) => folder.name === name);
    if (sameName) {
      alert("Такое имя папки уже существует!");
      return null;
    }

    const id = crypto.randomUUID();

    setFolders((prev) => {
      return [
        ...prev,
        {
          id,
          name,
          icon,
        },
      ];
    });

    return id;
  };

  //Переименование папки
  const renameFolder = (id: string, name: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder)),
    );
  };

  //Удаление папки
  const deleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  return (
    <FoldersContext.Provider
      value={{
        folders,
        setFolders,
        addNewFolder,
        renameFolder,
        deleteFolder,
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
