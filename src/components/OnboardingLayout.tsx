import { Outlet } from 'react-router-dom';

const OnBoardingLayout = () => {
  return (
    <div className="bg-main m-auto h-screen w-full max-w-[500px] bg-cover">
      <Outlet />
    </div>
  );
};

export default OnBoardingLayout;
