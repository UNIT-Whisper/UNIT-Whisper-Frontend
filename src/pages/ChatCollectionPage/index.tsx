import useCloudStore from '@/store/chat/chat';
import Chatcloud1 from '../ChatPage/images/clouds1.png';
import Chatcloud2 from '../ChatPage/images/clouds2.png';
import Chatcloud3 from '../ChatPage/images/clouds3.png';
import Chatcloud4 from '../ChatPage/images/clouds4.png';
import Chatcloud5 from '../ChatPage/images/clouds5.png';
import Chatcloud6 from '../ChatPage/images/clouds6.png';
import Chatcloud7 from '../ChatPage/images/clouds7.png';
import Chatcloud8 from '../ChatPage/images/clouds8.png';
import Chatcloud9 from '../ChatPage/images/clouds9.png';
import checkCloud1 from './img/checkClouds1.png';
import checkCloud2 from './img/checkClouds2.png';
import checkCloud3 from './img/checkClouds3.png';
import checkCloud4 from './img/checkClouds4.png';
import checkCloud5 from './img/checkClouds5.png';
import checkCloud6 from './img/checkClouds6.png';
import checkCloud7 from './img/checkClouds7.png';
import checkCloud8 from './img/checkClouds8.png';
import checkCloud9 from './img/checkClouds9.png';
import { useState } from 'react';
import useCheckCloudStore from '@/store/chat/chatCollect';

function ChatCollectionPage() {
  const clouds = useCloudStore((state) => state.clouds);
  return (
    <div className="relative h-[830px] w-full overflow-x-hidden overflow-y-scroll">
      {clouds.map((el, index) => (
        <Cloud key={index} index={index} text={el.text} randomIdx={el.randomIdx} />
      ))}
    </div>
  );
}

type cloudProp = {
  index: number;
  randomIdx: number;
  text: string;
};

const Cloud = (prop: cloudProp) => {
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
  const chatClickCloudImages = [
    checkCloud1,
    checkCloud2,
    checkCloud3,
    checkCloud4,
    checkCloud5,
    checkCloud6,
    checkCloud7,
    checkCloud8,
    checkCloud9,
  ];
  const ChatCloudImg = chatCloudImages[prop.randomIdx];
  const CheckChatCloudImg = chatClickCloudImages[prop.randomIdx];
  const height = 96 * prop.index;
  const [check, setCheck] = useState(false);
  const [addCloud, removeCloud] = useCheckCloudStore((state) => [
    state.addCloud,
    state.removeCloud,
  ]);
  const onClick = (check: boolean, text: string, index: number) => {
    const checkCloud = {
      text: text,
      index: index,
    };
    if (check == false) {
      addCloud(checkCloud);
      setCheck(!check);
    } else {
      removeCloud(checkCloud);
      setCheck(!check);
    }
  };
  return (
    <div
      style={{
        position: 'absolute',
        left: prop.index % 2 == 0 ? '-50px' : '200px',
        top: `${height}px`,
        width: '350px',
        height: '300px',
        backgroundImage: `url(${check ? CheckChatCloudImg : ChatCloudImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className={`${!check ? 'text-black ' : 'text-[#999999]'} m-auto w-40 cursor-pointer text-center font-Jalnan text-base font-bold text-[##4A5568]`}
        onClick={() => onClick(check, prop.text, prop.index)}
      >
        {prop.text}
      </div>
    </div>
  );
};

export default ChatCollectionPage;
