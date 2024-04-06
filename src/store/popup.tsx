import { create } from 'zustand';

interface PopStoreInterface {
  open: boolean;
  logout: boolean;
  setIsOpen: (open: boolean) => void;
  setIsLogout: (logout: boolean) => void;
}

export const usePopStore = create<PopStoreInterface>((set) => ({
  open: false,
  logout: false,
  setIsOpen: (open: boolean) => {
    set({ open });
  },
  setIsLogout: (logout: boolean) => {
    set({ logout });
  },
}));
