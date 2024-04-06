import { useNavigate } from 'react-router-dom';
import cloud from '/src/images/cloud.png';

function HomePage() {
  const naviator =useNavigate();
  // const [open, setIsOpen] = usePopStore((state) => [state.open, state.setIsOpen]);
  // const customStyles = {
  //   content: {
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //   },
  // };

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
        <div className=" mr-5 flex h-16 w-32 cursor-pointer items-center justify-center rounded bg-[#3BA8F4]  text-black hover:bg-[#0096FF]" onClick={()=>naviator('/chat')}>
          <span className="text-sm font-medium text-white">속삭임 하러가기</span>
        </div>
      </div>
      {/* <button onClick={() => setIsOpen(true)}>팝업 날리기</button>
      {open && (
        <Modal isOpen={open} onRequestClose={() => setIsOpen(false)} style={customStyles}>
          <div className="flex-col">
            <div dir="rtl" className="h-8">
              <img
                src={Close}
                className="w-5 h-5 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <img src={LoginBanner} className=" mb-5 h-[400px] w-96" />
            <div className="flex items-center justify-center mb-3 ">
              <img src={LoginModal} className="w-32 h-10 " />
            </div>
          </div>
        </Modal>
      )} */}
    </div>
  );
}

export default HomePage;
