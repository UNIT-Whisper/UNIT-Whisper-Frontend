import { create } from "zustand";

interface openState {
    open: boolean;
    setOpen: (openProp : boolean) => void;
  }

  const useOpenstore = create<openState>((set) => ({
    open : false, 
    setOpen: (openProp) =>
      set(() => ({
        open : openProp
      })),
  }));

  export default useOpenstore; 