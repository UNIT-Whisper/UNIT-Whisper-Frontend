import { create } from "zustand";

export type stampType = {
    whisperId : number,
    content : string,
    latitude : number,
    longitude: number,
    address : string,
    createDate : Date,
  }


  interface stampState {
    stamp: stampType;
    setStamp: (newStamp : stampType) => void;
  }

  const useStampstore = create<stampState>((set) => ({
    stamp: {
      whisperId : 0,
      content : "",
      latitude : 0,
      longitude: 0,
      address : "",
      createDate : new Date(),
    }, // 초기 상태(지금 당장은 이렇게)
    setStamp: (newStamp) =>
      set(() => ({
        stamp : newStamp
      })),
  }));

  export default useStampstore; 