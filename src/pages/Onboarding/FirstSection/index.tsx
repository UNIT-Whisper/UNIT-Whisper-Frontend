import oneStep from '/src/images/oneStep.png';
import oneBanner from '/src/images/oneBanner.png';
import { useNavigate } from 'react-router-dom';

const FirstSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-5">
      <img src={oneStep} className="w-[400px] py-6" />
      <div className="m-0 mb-6 flex w-full flex-col px-8">
        <span className="mb-3 text-3xl font-bold">
          마음 속에 쌓아두면 <br />
          병이 돼요~!
        </span>
        <span className="text-lg font-normal ">속삭임을 통해 마음의 짐 모두 날려버려요</span>
      </div>
      <img src={oneBanner} className=" mb-8 h-[570px] w-[400px]" />
      <button
        className=" h-14 w-[400px] bg-[#3BA8F4] text-white hover:bg-[#0096FF]"
        onClick={() => navigate('/onboarding2')}
      >
        다음으로
      </button>
    </div>
  );
};

export default FirstSection;
