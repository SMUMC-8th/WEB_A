// src/App.tsx
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import LoginPage from './pages/Auth/LoginPage';
import SignUpPage from './pages/Auth/SignUpPage';
import AgreementPage from './pages/Auth/AgreementPage';
import NicknamePage from './pages/Auth/NicknamePage';
import MyPage from './pages/Auth/MyPage'; //
import LoginCompletePage from './pages/Auth/LoginCompletePage';
import PasswordPage from './pages/Auth/PasswordPage';
import PrivacyPage from './pages/Auth/PrivacyPage';
import LogoutPage from './pages/Auth/Logout';
import WithdrawPage from './pages/Auth/WithdrawPage';
import ProfilePhotoPage from './pages/Auth/ProfilePhotoPage';
import Feed from './pages/Feed';
import ChatApp from './pages/ChatApp';
import Map from './pages/Map';
import '@sendbird/uikit-react/dist/index.css';
import { SendbirdProvider } from '@sendbird/uikit-react/SendbirdProvider';
import Location from './pages/location';
import Post from './pages/post';
import { PostWrite } from './components/post/PostWrite';
import ChatListPage from './pages/ChatListPage';

const myColorSet = {
  '--sendbird-light-primary-500': '#00487c',
  '--sendbird-light-primary-400': '#4bb3fd',
  '--sendbird-light-primary-300': '#3e6680',
  '--sendbird-light-primary-200': '#0496ff',
  '--sendbird-light-primary-100': '#027bce',
};

const router = createBrowserRouter([
  //  Layout이 적용되어야 하는 내부 페이지들
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 에러 발생 관리자에게 문의하세요!</div>,
    children: [
      { path: 'map', element: <Map /> },
      { path: 'feed', element: <Feed /> },

      { path: 'chat', element: <ChatListPage /> },
      { path: 'chat/:channelUrl', element: <ChatApp /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'location', element: <Location /> },
    ],
  },

  //  Layout 없이 렌더링되는 페이지들
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/agreement', element: <AgreementPage /> },
  { path: '/nickname', element: <NicknamePage /> },
  { path: '/profilephoto', element: <ProfilePhotoPage /> },
  { path: '/logincomplete', element: <LoginCompletePage /> },
  { path: '/password', element: <PasswordPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/logout', element: <LogoutPage /> },
  { path: '/withdraw', element: <WithdrawPage /> },
  { path: 'post/write', element: <PostWrite /> },
  { path: '/location', element: <Location /> },
  { path: 'post', element: <Post /> },
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
