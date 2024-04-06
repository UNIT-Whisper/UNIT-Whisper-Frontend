import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ChatCollectionPage from './pages/ChatCollectionPage';
import Layout from './components/Layout';
import FirstSection from './pages/Onboarding/FirstSection';
import SecondSection from './pages/Onboarding/SecondSection';
import ThirdSection from './pages/Onboarding/ThirdSection';
import OnBoardingLayout from './components/OnboardingLayout';
import MapLayout from './components/MapLayout';
import MapPage from './pages/MapPage';
import StampPage from './pages/StampPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'chatCollection',
        element: <ChatCollectionPage />,
      },
      {
        path: 'auth/callback/kakao',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/',
    element: <OnBoardingLayout />,
    children: [
      {
        path: 'onboarding1',
        element: <FirstSection />,
      },
      {
        path: 'onboarding2',
        element: <SecondSection />,
      },
      {
        path: 'onboarding3',
        element: <ThirdSection />,
      },
    ],
  },
  {
    path: '/',
    element: <MapLayout />,
    children: [
      {
        path: 'mapMarker',
        element: <MapPage />,
      },
      {
        path: 'mapStamp',
        element: <StampPage />,
      },
    ],
  },
]);

export default router;
