import { useEffect, useRef, useState } from 'react';
import Chatcloud1 from './images/clouds1.png';
import Chatcloud2 from './images/clouds2.png';
import Chatcloud3 from './images/clouds3.png';
import Chatcloud4 from './images/clouds4.png';
import Chatcloud5 from './images/clouds5.png';
import Chatcloud6 from './images/clouds6.png';
import Chatcloud7 from './images/clouds7.png';
import Chatcloud8 from './images/clouds8.png';
import Chatcloud9 from './images/clouds9.png';
import useCloudStore from '@/store/chat/chat';

import airplane from '/src/images/airplane.png';
import record from '/src/images/record.png';
import smallCloud from '/src/images/smallCloud.png';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const [data, setData] = useState('');
  const navigator = useNavigate();
  const [clouds, addCloud] = useCloudStore((state) => [state.clouds, state.addCloud]);
  const [isComposing, setIsComposing] = useState(false);
  const [leftPosition, setLeftPosition] = useState('0%');
  const [imgIdx, setImgIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };
  const resetClouds = useCloudStore((state) => state.resetClouds);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이를 auto로 설정하여 먼저 크기를 축소합니다.
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // scrollHeight 값을 사용하여 높이를 조정합니다.
    }
  }, [data]);
  const handleKeyPress = (event: React.KeyboardEvent) => {
    setLeftPosition(`${Math.floor(Math.random() * 40)}%`);
    setImgIdx(Math.floor(Math.random() * 9));
    if (isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      const newCloud = {
        text: data,
        leftPosition: leftPosition,
        randomIdx: imgIdx,
        check: false,
      };
      addCloud(newCloud);
      setData('');
    }
  };

  const onClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    if (data === '') return;
    const newCloud = {
      text: data,
      leftPosition: leftPosition,
      randomIdx: imgIdx,
      check: false,
    };
    addCloud(newCloud);
    setData('');
  };

  return (
    <>
      <div className="absolute top-[90%] z-30 ml-3 w-full max-w-[460px]">
        <div className=" flex w-full max-w-[435px] items-center gap-1 rounded border border-solid bg-white px-4 py-3">
          <textarea
            value={data}
            ref={textareaRef}
            onChange={onChange}
            placeholder="궁시렁 궁시렁 입력하기"
            maxLength={100}
            className="over:outline-dashed h-8 w-full resize-none overflow-hidden outline-none"
            onKeyDown={handleKeyPress}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <div
            className="flex h-7  w-8 cursor-pointer items-center justify-center rounded-lg bg-[#3BA8F4] text-white hover:bg-[#0096FF]"
            onClick={onClickEvent}
          >
            <img src={smallCloud} className="h-4 w-4" />
          </div>
        </div>
      </div>
      {clouds.length !== 0 && (
        <div className=" absolute top-[80%] z-50 flex w-full max-w-[460px] justify-center gap-3 ">
          <div className="group">
            <div
              className=" flex h-14 w-52 cursor-pointer items-center justify-center rounded-md bg-[#A0AEC0] text-white hover:bg-[#718096]"
              onClick={resetClouds}
            >
              <img src={airplane} className="mr-2 h-6 w-6" />
              <span>구름 날려버리기</span>
            </div>
            <div className="absolute bottom-[35px] mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-500  group-hover:opacity-100 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)]">
              <div className="flex max-w-xs flex-col items-center">
                <div className="rounded bg-[#718096] p-2 text-left text-xs shadow-lg">
                  훌훌 날려보내세요. <br /> 어디에도 기록이 남지 않아요!!
                </div>
                <div className="h-1 w-2 bg-[#718096] " />
              </div>
            </div>
          </div>
          <div className="group">
            <div
              className=" flex h-14 w-52 cursor-pointer items-center justify-center rounded-md bg-[#A0AEC0] text-white hover:bg-[#718096]"
              onClick={() => navigator('/chatcollection')}
            >
              <img src={record} className="mr-2 h-6 w-6" />
              <span>구름 아카이브</span>
            </div>
            <div className="absolute bottom-[35px] mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-500  group-hover:opacity-100 group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)]">
              <div className="flex max-w-xs flex-col items-center">
                <div className="rounded bg-[#718096] p-2 text-left text-xs shadow-lg ">
                  구름을 원하는 곳에 저장해두세요. <br /> 그 장소에 갈 때마다 알려드려요.
                </div>
                <div className="h-1 w-2 bg-[#718096] " />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative h-24 w-full max-w-[460px]">
        {clouds.length === 0 ? (
          <div className="flex h-[600px] items-center justify-center text-xl font-bold text-[#CBD5E0]">
            오늘 하고 싶은 말 한마디를 적어주세요
          </div>
        ) : (
          <div>
            {clouds.map((el, index) => (
              <Cloud key={index} data={el.randomIdx} left={el.leftPosition} index={index} />
            ))}
          </div>
        )}
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
