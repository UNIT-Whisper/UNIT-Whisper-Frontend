import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="relative m-auto h-screen w-full max-w-[480px] bg-[#F1F8FD]">
      <div className="flex h-16 w-full bg-white py-[14px] pl-5">
        <button>뒤로가기</button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
