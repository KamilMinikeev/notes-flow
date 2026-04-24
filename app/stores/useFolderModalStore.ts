import { create } from "zustand";

type FolderModalState = {
  isCreateFolderOpen: boolean;
  openCreateFolder: () => void;
  closeCreateFolder: () => void;
};

export const useFolderModalStore = create<FolderModalState>((set) => ({
  isCreateFolderOpen: false,

  openCreateFolder: () => set({ isCreateFolderOpen: true }),
  closeCreateFolder: () => set({ isCreateFolderOpen: false }),
}));
