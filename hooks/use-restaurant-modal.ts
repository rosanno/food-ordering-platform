import { create } from "zustand";

interface useRestaurantModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRestaurantModal =
  create<useRestaurantModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
