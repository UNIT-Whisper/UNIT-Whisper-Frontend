import { StateCreator, create } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';

type cloudType = {
  text: string;
  leftPosition: string;
  randomIdx: number;
  check: boolean;
};

interface CloudState {
  clouds: cloudType[];
  addCloud: (newCloud: cloudType) => void;
  resetClouds: () => void;
}

type MyPersist = (
  config: StateCreator<CloudState>,
  options: PersistOptions<CloudState>
) => StateCreator<CloudState>;

// 스토어 생성
const useCloudStore = create<CloudState>(
  (persist as MyPersist)(
    (set, get) => ({
      clouds: [],
      addCloud: (newCloud: cloudType) =>
        set({
          clouds: [...get().clouds, newCloud],
        }),
      resetClouds: () =>
        set({
          clouds: [],
        }),
    }),
    {
      name: 'cloud-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCloudStore;
