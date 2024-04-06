import twoStep from '/src/images/twoStep.png';
import twoBanner from '/src/images/twoBanner.png';
import { useNavigate } from 'react-router-dom';

const SecondSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-5">
      <img src={twoStep} className="w-[400px] py-6" />
      <div className="m-0 mb-6 flex w-full flex-col px-8">
        <span className="mb-3 text-3xl font-bold">채팅 구름 날려보내기</span>
        <span className="text-lg font-normal ">
          지금만 쏟아내고 다시는 안보고 싶을 때? <br />
          채팅으로 작성하고 한 번에 날려봐요
        </span>
      </div>
      <img src={twoBanner} className=" mb-8 h-[570px] w-[400px]" />
      <button
        className=" h-14 w-[400px] bg-[#3BA8F4] text-white hover:bg-[#0096FF]"
        onClick={() => {
          navigate('/onboarding3');
          sessionStorage.setItem(
            'accessToken',
            'eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNzEyNDM0MDYwLCJzdWIiOiI0IiwidHlwZSI6IkFDQ0VTU19UT0tFTiIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNzEyNTIwNDYwfQ.Lr07UOmCUa65PQbmkFLptiCoF7f5eLvTxnqNx606NlfbQGc8y9uzJgAWdBmGZAiu'
          );
        }}
      >
        다음으로
      </button>
    </div>
  );
};

export default SecondSection;
