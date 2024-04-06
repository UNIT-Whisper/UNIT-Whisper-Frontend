import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ChatCollectionPage from './pages/ChatCollectionPage';
import Layout from './components/Layout';
import FirstSection from './pages/Onboarding/FirstSection';
import SecondSection from './pages/Onboarding/SecondSection';
import ThirdSection from './pages/Onboarding/ThirdSection';
import OnBoardingLayout from './components/OnboardingLayout';

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
]);

export default router;
