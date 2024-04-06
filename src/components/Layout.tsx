import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import kakaoLogin from '/src/images/path.png';
import back from '/src/images/back.png';
import loginBanner from '/src/images/loginBanner.png';
import loginModal from '/src/images/loginModal.png';
import close from '/src/images/close.png';
import group from '/src/images/group.png';
import offAlert from '/src/images/offAlert.png';
import useCloudStore from '@/store/chat/chat';
import { usePopStore } from '@/store/popup';
import Modal from 'react-modal';
import axios from 'axios';
import { useEffect } from 'react';

const Layout = () => {
  const navigate = useNavigate();
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`;
  const { pathname } = useLocation();
  const resetClouds = useCloudStore((state) => state.resetClouds);
  const [open, logout, tooltip, setTooltip, setIsLogout, setIsOpen] = usePopStore((state) => [
    state.open,
    state.logout,
    state.tooltip,
    state.setIsTooltip,
    state.setIsLogout,
    state.setIsOpen,
  ]);
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

  const customTooltipStyles = {
    content: {
      top: '10%',
      left: 'auto%',
      right: '20%',
      bottom: 'auto',
      marginLeft: '-20%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const code = new URL(document.location.toString()).searchParams.get('code');

  const loginHandler = () => {
    window.location.href = link;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          const response = await axios.post('http://54.180.66.230/user/login', {
            authCode: code,
            redirectUri: 'http://localhost:3000/auth/callback/kakao',
          });

          if (response.data.code === 0) {
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [code]);

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
            <img
              src={offAlert}
              className="mr-2 h-8 w-8 cursor-pointer"
              onClick={() => setTooltip(true)}
            />
            <div
              className="mr-5 flex cursor-pointer items-center rounded bg-[#3BA8F4] px-2 py-1 text-black hover:bg-[#0096FF]"
              onClick={() => {
                setIsLogout(true);
              }}
            >
              <span className="text-sm font-medium text-white">로그아웃</span>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex h-16 w-full items-center justify-end border-b-[1px] bg-white py-[14px] pl-5">
          {sessionStorage.getItem('accessToken') === null ? (
            <div
              className="mr-5 flex cursor-pointer items-center rounded bg-[#FEE500] px-2 py-1 text-black"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <img src={kakaoLogin} className="h-3 w-3 " />
              <span className="pl-1">로그인</span>
            </div>
          ) : (
            <div
              className="mr-5 flex cursor-pointer items-center rounded bg-[#3BA8F4] px-2 py-1 text-black hover:bg-[#0096FF]"
              onClick={() => {
                setIsLogout(true);
              }}
            >
              <span className="text-sm font-medium text-white">로그아웃</span>
            </div>
          )}
        </div>
      )}
      {open && (
        <Modal
          ariaHideApp={false}
          isOpen={open}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
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
            <div
              className="flex h-[60px] cursor-pointer items-center rounded bg-[#FEE500] px-2 py-1 text-black"
              onClick={() => {
                loginHandler();
                sessionStorage.setItem('accessToken', import.meta.env.VITE_ACCESS_TOKEN);
              }}
            >
              <img src={kakaoLogin} className="ml-3 h-6 w-6" />
              <div className="m-auto flex items-center justify-center pr-6">
                <span className="text-center font-semibold ">카카오 로그인</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {logout && (
        <Modal isOpen={logout} onRequestClose={() => setIsLogout(false)} style={customStyles}>
          <div className="flex flex-col">
            <span className="my-5 text-center text-xl font-medium">
              정말 이대로 로그아웃 하시겠어요?
            </span>
            <div className="flex items-center gap-3">
              <button
                className=" h-14 w-40  rounded-md bg-[#CBD5E0] text-white hover:bg-[#718096]"
                onClick={() => {
                  resetClouds();
                  navigate('/');
                  sessionStorage.removeItem('accessToken');
                  setIsLogout(false);
                }}
              >
                로그아웃 할래요
              </button>
              <button
                className=" h-14 w-40  rounded-md bg-[#5DBCFF] text-white hover:bg-[#0096FF]"
                onClick={() => setIsLogout(false)}
              >
                안할래요
              </button>
            </div>
          </div>
        </Modal>
      )}
      {tooltip && (
        <Modal
          isOpen={tooltip}
          onRequestClose={() => setTooltip(false)}
          style={customTooltipStyles}
        >
          <div className="flex flex-col">
            <div className="my-5 flex items-center justify-between">
              <span>알림</span>
              <div className="flex h-8 w-20 items-center justify-center rounded-md bg-[#A0AEC0] text-white">
                모두 읽기
              </div>
            </div>
            <div className="flex justify-center ">
              <img src={group} className="mr-5 h-6 w-6 cursor-pointer " />
              <div className="flex flex-col">
                <span className="leading-6">
                  근처에 스쳐간 구름이 하나 있어요. <br /> 확인해보시겠어요?
                </span>
                <span className="mt-2 text-xs font-normal text-[#718096]">
                  서울특별시 성동구 아차산로 17길 48
                </span>
                <button className="m-auto mt-3  flex rounded-md border-[1px] px-1">
                  확인 하기
                </button>
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
