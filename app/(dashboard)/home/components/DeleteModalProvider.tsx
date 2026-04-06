"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import DeleteModal from "./DeleteModal/DeleteModal";

type DeleteModalContextType = {
  requestDeleteConfirm: (params: {
    title: string;
    onConfirm: () => void;
  }) => void;
};

const DeleteModalContext = createContext<DeleteModalContextType | undefined>(
  undefined,
);

export const DeleteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
  const [title, setTitle] = useState<string>("");

  const requestDeleteConfirm = ({
    title,
    onConfirm,
  }: {
    title: string;
    onConfirm: () => void;
  }) => {
    setTitle(title);
    setOnConfirm(() => onConfirm);
    setIsDeleteModalOpen(true);
  };

  //удаление заметки
  const handleDelete = () => {
    onConfirm?.();
    cleanup();
  };

  const handleDiscard = () => {
    cleanup();
  };

  const cleanup = () => {
    setIsDeleteModalOpen(false);
    setOnConfirm(null);
  };

  return (
    <DeleteModalContext.Provider value={{ requestDeleteConfirm }}>
      {children}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onDelete={handleDelete}
        onDiscard={handleDiscard}
        title={title}
      />
    </DeleteModalContext.Provider>
  );
};

export const useDeleteModal = () => {
  const context = useContext(DeleteModalContext);
  if (!context) {
    throw new Error("useDeleteModal must be used inside DeleteModalProvider");
  }

  return context;
};
