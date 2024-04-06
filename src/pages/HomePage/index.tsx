import { useNavigate } from 'react-router-dom';
import cloud from '/src/images/cloud.png';

function HomePage() {
  const naviator = useNavigate();

  return (
    <div className="flex h-[820px] flex-col items-center justify-center">
      <img src={cloud} className="mb-4 h-20 w-24" />
      <div className="flex flex-col items-center justify-center ">
        <span className="mb-4 text-center text-2xl font-bold leading-8">
          아무말이나 하고 싶은 말을 <br /> 써내려가보세요!
        </span>
        <span className=" mb-10  text-base font-medium text-[#4A5568]">
          싫었던 감정도, 좋았던 감정도 혹은 아무 말이여도 좋아요!
        </span>
        <div
          className=" mr-5 flex h-16 w-32 cursor-pointer items-center justify-center rounded bg-[#3BA8F4]  text-black hover:bg-[#0096FF]"
          onClick={() => naviator('/chat')}
        >
          <span className="text-sm font-medium text-white">속삭임 하러가기</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
