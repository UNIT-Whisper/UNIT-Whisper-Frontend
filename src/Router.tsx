import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ChatCollectionPage from './pages/ChatCollectionPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/chatCollection',
    element: <ChatCollectionPage />,
  },
]);

export default router;
