import { usePopStore } from '@/store/popup';
import Modal from 'react-modal';
import Close from '/public/close.png';
import LoginBanner from '/public/loginBanner.png';
import LoginModal from '/public/loginModal.png';

function HomePage() {
  const [open, setIsOpen] = usePopStore((state) => [state.open, state.setIsOpen]);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const Rest_api_key = '5818289447397369d006bcd7145c25d6';
  const redirect_uri = 'http://localhost:3000/login/callback';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <div className="pl-5">
      <button onClick={handleLogin}>카카오 로그인</button>
      <button onClick={() => setIsOpen(true)}>팝업 날리기</button>
      {open && (
        <Modal isOpen={open} onRequestClose={() => setIsOpen(false)} style={customStyles}>
          <div className="flex-col">
            <div dir="rtl" className="h-8">
              <img
                src={Close}
                className="h-5 w-5 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <img src={LoginBanner} className=" mb-5 h-[400px] w-96" />
            <div className="mb-3 flex items-center justify-center ">
              <img src={LoginModal} className="h-10 w-32 " />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
