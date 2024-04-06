import { create } from "zustand";

type cloudType = {
    text : string,
    leftPosition : string,
    randomIdx : number,
    check : boolean,
  }

  interface CloudState {
    clouds: cloudType[];
    addCloud: (newCloud: cloudType) => void;
    getClouds: () => cloudType[];
    resetClouds: () => void;
  }
  
  // 스토어 생성
  const useCloudStore = create<CloudState>((set, get) => ({
    clouds: [], // 초기 상태
    addCloud: (newCloud) =>
      set((state) => ({
        clouds: [...state.clouds, newCloud],
      })),
      getClouds: () => {
        return get().clouds; // get을 사용하여 현재 clouds 상태 반환
      },
      resetClouds: () => set(() => ({ clouds: [] })),
  }));

  export default useCloudStore;