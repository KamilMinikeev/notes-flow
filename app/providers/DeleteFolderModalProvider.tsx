"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import DeleteFolderModal from "../(dashboard)/home/components/Modals/DeleteFolderModal";

type DeleteFolderModalContextType = {
  requestDeleteConfirm: (params: {
    title: string;
    onConfirm: () => void;
  }) => void;
};

const DeleteFolderModalContext = createContext<
  DeleteFolderModalContextType | undefined
>(undefined);

export const DeleteFolderModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
    <DeleteFolderModalContext.Provider value={{ requestDeleteConfirm }}>
      {children}
      <DeleteFolderModal
        isOpen={isDeleteModalOpen}
        onDelete={handleDelete}
        onDiscard={handleDiscard}
        title={title}
      />
    </DeleteFolderModalContext.Provider>
  );
};

export const useDeleteFolderModal = () => {
  const context = useContext(DeleteFolderModalContext);
  if (!context) {
    throw new Error(
      "useDeleteFolderModal must be used inside DeleteFolderModalProvider",
    );
  }

  return context;
};
