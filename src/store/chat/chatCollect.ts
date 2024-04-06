import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

type checkCloud = {
    text : string,
    index : number,
  }

  interface CloudState {
    clouds: checkCloud[];
    addCloud: (newCloud: checkCloud) => void;
    removeCloud : (removeCloud : checkCloud) => void;
    resetClouds: () => void;
  }

  type MyPersist = (
    config : StateCreator<CloudState>,
    options : PersistOptions<CloudState>
  ) => StateCreator<CloudState>

  const useCheckCloudStore = create<CloudState>(
    (persist as MyPersist)(
        (set,get) =>({
            clouds : [],
            addCloud : (newCloud : checkCloud) =>
            set({
                clouds : [...get().clouds, newCloud]
            }),
            removeCloud : (removeCloud : checkCloud) =>
            set({
                clouds: get().clouds.filter(cloud => cloud.index !== removeCloud.index)
            }),
            resetClouds: () =>
            set({
              clouds: [],
            }),
        }),
        {
            name : "checkCloud-storage",
            storage : createJSONStorage(()=>sessionStorage),
        },
    ),
    );

  export default useCheckCloudStore;