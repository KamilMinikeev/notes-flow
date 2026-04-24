"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import DraftModal from "../(dashboard)/home/components/Modals/DraftModal/DraftModal";

type DraftModalContextType = {
  requestDraftConfirm: (onConfirm: () => void, onDiscard?: () => void) => void;
};

const DraftModalContext = createContext<DraftModalContextType | undefined>(
  undefined,
);

export const DraftModalProvider = ({ children }: { children: ReactNode }) => {
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
  const [onDiscard, setOnDiscard] = useState<(() => void) | null>(null);

  const requestDraftConfirm = (
    onConfirmCallback: () => void,
    onDiscardCallback?: () => void,
  ) => {
    setOnConfirm(() => onConfirmCallback);
    setOnDiscard(() => onDiscardCallback ?? null);
    setIsDraftModalOpen(true);
  };

  //сохранение черновика
  const handleSave = () => {
    onConfirm?.();
    cleanup();
  };

  const handleDiscard = () => {
    onDiscard?.();
    cleanup();
  };

  const cleanup = () => {
    setIsDraftModalOpen(false);
    setOnConfirm(null);
    setOnDiscard(null);
  };

  return (
    <DraftModalContext.Provider value={{ requestDraftConfirm }}>
      {children}
      <DraftModal
        isOpen={isDraftModalOpen}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </DraftModalContext.Provider>
  );
};

export const useDraftModal = () => {
  const context = useContext(DraftModalContext);
  if (!context) {
    throw new Error("useDraftModal must be used inside DraftModalProvider");
  }

  return context;
};
