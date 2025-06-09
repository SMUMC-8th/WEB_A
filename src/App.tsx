// src/App.tsx
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Map from './pages/Map';
import Feed from './pages/Feed';
import '@sendbird/uikit-react/dist/index.css';
import { SendbirdProvider } from '@sendbird/uikit-react/SendbirdProvider';
import ChatApp from './pages/ChatApp';
import ChatListPage from './pages/ChatListPage';
import Post from './pages/Post';
import { PostWrite } from './components/post/PostWrite';
import Location from './pages/Location';

const myColorSet = {
  '--sendbird-light-primary-500': '#00487c',
  '--sendbird-light-primary-400': '#4bb3fd',
  '--sendbird-light-primary-300': '#3e6680',
  '--sendbird-light-primary-200': '#0496ff',
  '--sendbird-light-primary-100': '#027bce',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 에러 발생 관리자에게 문의하세요!</div>,
    children: [
      { path: 'map', element: <Map /> },
      { path: 'feed', element: <Feed /> },
      { path: 'chat', element: <ChatListPage /> },
      { path: 'chat/:channelUrl', element: <ChatApp /> },
      { path: 'mypage', element: <div>마이페이지입니다.</div> },
    ],
  },
  {
    path: '/post',
    element: <Post />,
  },
  {
    path: '/post/write',
    element: <PostWrite />,
  },
  {
    path: '/location',
    element: <Location />,
  },
]);

function App() {
  return (
    <SendbirdProvider
      appId="B73D82D8-F243-43E5-9379-FAFB5F1FC574"
      userId="1234"
      colorSet={myColorSet}
    >
      <RouterProvider router={router} />
    </SendbirdProvider>
  );
}
export default App;
