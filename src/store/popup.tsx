import { create } from 'zustand';

interface PopStoreInterface {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export const usePopStore = create<PopStoreInterface>((set) => ({
  open: false,
  setIsOpen: (open: boolean) => {
    set({ open });
  },
}));
