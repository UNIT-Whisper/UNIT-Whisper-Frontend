import { useEffect, useRef, useState } from "react";
import Chatcloud1 from "./images/clouds1.png";
import Chatcloud2 from "./images/clouds2.png";
import Chatcloud3 from "./images/clouds3.png";
import Chatcloud4 from "./images/clouds4.png";
import Chatcloud5 from "./images/clouds5.png";
import Chatcloud6 from "./images/clouds6.png";
import Chatcloud7 from "./images/clouds7.png";
import Chatcloud8 from "./images/clouds8.png";
import Chatcloud9 from "./images/clouds9.png";
import useCloudStore from "@/store/chat/chat";

function ChatPage() {
  const [data, setData] = useState("");
  const clouds = useCloudStore((state) => state.getClouds());
  const addCloud = useCloudStore((state) => state.addCloud);
  const resetCloud = useCloudStore((state)=>state.resetClouds);
  const [isComposing, setIsComposing] = useState(false);
  const [leftPosition, setLeftPosition] = useState('0%');
  const [imgIdx, setImgIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };
  useEffect(()=>{
    resetCloud;
  },[])
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이를 auto로 설정하여 먼저 크기를 축소합니다.
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // scrollHeight 값을 사용하여 높이를 조정합니다.
    }
  }, [data]);
  const handleKeyPress = (event: React.KeyboardEvent) => {
    setLeftPosition(`${Math.floor(Math.random() * 50)}%`);
    setImgIdx(Math.floor(Math.random() * 9));
    if (isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      const newCloud =  {
        text : data,
        leftPosition : leftPosition,
        randomIdx : imgIdx,
        check : false,
      }
      addCloud(newCloud);
      setData(""); // 입력 필드 초기화
    }
  };
  return (
    <>
      <div className="absolute top-[89%] z-30 mb-[61px] w-full px-5">
        <div className="flex w-full items-center gap-1 rounded border border-solid bg-white px-4 py-3">
          <textarea
            value={data}
            ref={textareaRef}
            onChange={onChange}
            placeholder="궁시렁 궁시렁 입력하기"
            className="resize-none overflow-hidden"
            onKeyDown={handleKeyPress}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
        </div>
      </div>
      <div className="relative h-24 w-full">
        {clouds.map((el, index) => (
          <Cloud key={index} data={el.randomIdx} left={el.leftPosition} index={index} />
        ))}
      </div>
    </>
  );
}

const Cloud = ({ data, left, index }: { data: number; left: string; index: number }) => {
  const chatCloudImages = [
    Chatcloud1,
    Chatcloud2,
    Chatcloud3,
    Chatcloud4,
    Chatcloud5,
    Chatcloud6,
    Chatcloud7,
    Chatcloud8,
    Chatcloud9,
  ];

  const [height, setHeight] = useState(window.innerHeight - 100);
  //구름층 나타내기
  const cloudLayer = index / 4;
  const minHeight = -30 + 50 * cloudLayer;
  const randomChatCloudImage = chatCloudImages[data];
  useEffect(() => {
    const timer = setInterval(() => {
      setHeight((prevHeight) => {
        const newHeight = prevHeight - 80;
        if (newHeight <= minHeight) {
          clearInterval(timer);
          return minHeight;
        }
        return newHeight;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <img
      src={randomChatCloudImage}
      alt="구름애들"
      style={{
        position: 'absolute',
        left: left,
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        top: `${height}px`,
        transition: 'top 1.2s ease-out',
      }}
    />
  );
};

export default ChatPage;
