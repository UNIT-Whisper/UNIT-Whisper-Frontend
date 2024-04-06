import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ChatCollectionPage from './pages/ChatCollectionPage';
import Layout from './components/Layout';

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
]);

export default router;
