import { create } from "zustand";

export type stampType = {
    lat : number,
    lon: number,
    date : Date,
    content : Array<string>
  }


  interface stampState {
    stamp: stampType;
    setStamp: (newStamp : stampType) => void;
  }

  const useStampstore = create<stampState>((set) => ({
    stamp: {
        lat : 0,
        lon : 0,
        date : new Date(),
        content : [],
    }, // 초기 상태(지금 당장은 이렇게)
    setStamp: (newStamp) =>
      set(() => ({
        stamp : newStamp
      })),
  }));

  export default useStampstore; 