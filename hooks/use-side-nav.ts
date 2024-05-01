import { create } from "zustand";

interface useSideNav {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSideNav = create<useSideNav>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
