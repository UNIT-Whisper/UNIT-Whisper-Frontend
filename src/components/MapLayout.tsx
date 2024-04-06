import { Outlet } from 'react-router-dom';

const MapLayout = () => {
  return (
    <div className="bg-main m-auto h-screen w-full max-w-[500px] bg-cover">
      <div className="flex h-16 w-full bg-white py-[14px] pl-5">
        <button>뒤로가기</button>
      </div>
      <Outlet />
    </div>
  );
};

export default MapLayout;
