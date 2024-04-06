import { create } from 'zustand';

interface PopStoreInterface {
  open: boolean;
  logout: boolean;
  tooltip: boolean;
  setIsOpen: (open: boolean) => void;
  setIsLogout: (logout: boolean) => void;
  setIsTooltip: (tooltip: boolean) => void;
}

export const usePopStore = create<PopStoreInterface>((set) => ({
  open: false,
  logout: false,
  tooltip: false,
  setIsOpen: (open: boolean) => {
    set({ open });
  },
  setIsLogout: (logout: boolean) => {
    set({ logout });
  },
  setIsTooltip: (tooltip: boolean) => {
    set({ tooltip });
  },
}));
