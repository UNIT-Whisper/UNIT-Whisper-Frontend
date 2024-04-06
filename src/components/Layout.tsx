import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import kakaoLogin from '/src/images/path.png';
import back from '/src/images/back.png';
import offAlert from '/src/images/offAlert.png';
import useCloudStore from '@/store/chat/chat';

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const resetClouds = useCloudStore((state) => state.resetClouds);

  return (
    <div className="m-auto h-screen w-full max-w-[500px] bg-main bg-cover px-5">
      {pathname === '/chat' || pathname === '/chatcollection' ? (
        <div className="flex h-16 w-full justify-between  border-b-[1px] py-[14px] pl-5">
          <div className="flex justify-between">
            <img src={back} className="h-8 w-8 cursor-pointer" onClick={() => navigate(-1)} />
          </div>
          <span className="ml-10 text-lg font-bold leading-[35px] text-[#4A5568]">작성하기</span>

          <div className="flex justify-end">
            <img src={offAlert} className="mr-2 h-8 w-8 cursor-pointer" />
            <div className="mr-5 flex cursor-pointer items-center rounded bg-[#3BA8F4] px-2 py-1 text-black hover:bg-[#0096FF]">
              <span className="text-sm font-medium text-white" onClick={resetClouds}>
                로그아웃
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex h-16 w-full items-center justify-end border-b-[1px] bg-white py-[14px] pl-5">
          <div className="mr-5 flex cursor-pointer items-center rounded bg-[#FEE500] px-2 py-1 text-black">
            <img src={kakaoLogin} className="h-3 w-3 " />
            <span className="pl-1">로그인</span>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Layout;
