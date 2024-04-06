import threeStep from '/src/images/threeStep.png';
import threeBanner from '/src/images/threeBanner.png';
import { useNavigate } from 'react-router-dom';

const ThirdSection = () => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-5">
      <img src={threeStep} className="w-[400px] py-6" />
      <div className="m-0 mb-6 flex w-full flex-col px-8">
        <span className="mb-3 text-3xl font-bold">구름 아카이브 기능!</span>
        <span className="text-lg font-normal ">
          지금 느낀 이 감정, 동일한 장소에서 스치듯 <br />
          기억하고 싶을 때
        </span>
      </div>
      <img src={threeBanner} className=" mb-8 h-[570px] w-[400px]" />
      <button
        className="h-14 w-[400px] bg-[#3BA8F4] text-white hover:bg-[#0096FF]"
        onClick={() => navigator('/')}
      >
        다음으로
      </button>
    </div>
  );
};

export default ThirdSection;
