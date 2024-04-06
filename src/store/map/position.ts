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
        lat : 37.54628231137026,
        lon : 127.06716016035485,
    }, // 초기 상태(지금 당장은 이렇게)
    setPosition: (newPosition) =>
      set(() => ({
        position : newPosition
      })),
  }));

  export default usePositionstore; 

  