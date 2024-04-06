import { create } from "zustand";

type positionType = {
    lat : number,
    lon: number,
  }

  interface positionState {
    position: positionType;
    setPosition: (newPosition : positionType) => void;
  }

  const usePositionstore = create<positionState>((set) => ({
    position: {
        lat : 0,
        lon : 0,
    }, // 초기 상태
    setPosition: (newPosition) =>
      set(() => ({
        position : newPosition
      })),
  }));

  export default usePositionstore; 

  