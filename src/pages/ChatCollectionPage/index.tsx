import useCloudStore from "@/store/chat/chat";
import { useEffect } from "react";

function ChatCollectionPage() {
  const clouds = useCloudStore((state) => state.getClouds());
  useEffect(()=>{
    console.log(clouds);
  },[])
  return <div>
              {clouds.map((el,index) => (
            <div
              key={index}
            >{el.text}</div>
          ))}
  </div>;
}

export default ChatCollectionPage;
