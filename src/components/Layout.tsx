import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import kakaoLogin from '/src/images/path.png';
import back from '/src/images/back.png';
import loginBanner from '/src/images/loginBanner.png';
import loginModal from '/src/images/loginModal.png';
import close from '/src/images/close.png';
import offAlert from '/src/images/offAlert.png';
import useCloudStore from '@/store/chat/chat';
import { usePopStore } from '@/store/popup';
import Modal from 'react-modal';

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const resetClouds = useCloudStore((state) => state.resetClouds);
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

  return (
    <div className="m-auto h-screen w-full max-w-[500px] bg-main bg-cover px-5">
      {pathname === '/chat' || pathname === '/chatcollection' ? (
        <div className="flex h-16 w-full justify-between  border-b-[1px] py-[14px] pl-5">
          <div className="flex justify-between">
            <img src={back} className="h-8 w-8 cursor-pointer" onClick={() => navigate(-1)} />
          </div>
          <span className="ml-10 text-lg font-bold leading-[35px] text-[#4A5568]">
            {pathname === '/chat' ? '작성하기' : '구름 선택'}
          </span>

          <div className="flex justify-end">
            <img src={offAlert} className="mr-2 h-8 w-8 cursor-pointer" />
            <div className="mr-5 flex cursor-pointer items-center rounded bg-[#3BA8F4] px-2 py-1 text-black hover:bg-[#0096FF]">
              <span
                className="text-sm font-medium text-white"
                onClick={() => {
                  resetClouds();
                  navigate('/');
                }}
              >
                로그아웃
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex h-16 w-full items-center justify-end border-b-[1px] bg-white py-[14px] pl-5">
          <div
            className="mr-5 flex cursor-pointer items-center rounded bg-[#FEE500] px-2 py-1 text-black"
            onClick={() => setIsOpen(true)}
          >
            <img src={kakaoLogin} className="h-3 w-3 " />
            <span className="pl-1">로그인</span>
          </div>
        </div>
      )}
      {open && (
        <Modal isOpen={open} onRequestClose={() => setIsOpen(false)} style={customStyles}>
          <div className="flex-col">
            <div dir="rtl" className="h-8">
              <img
                src={close}
                className="h-5 w-5 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <img src={loginBanner} className=" mb-5 h-[400px] w-96" />
            <div className="mb-3 flex items-center justify-center ">
              <img src={loginModal} className="h-10 w-32 " />
            </div>
            <div className="flex h-[60px] cursor-pointer items-center   rounded bg-[#FEE500] px-2 py-1 text-black">
              <img src={kakaoLogin} className="ml-3 h-6 w-6" />
              <div className="m-auto flex items-center justify-center pr-6">
                <span className="text-center font-semibold ">카카오 로그인</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
