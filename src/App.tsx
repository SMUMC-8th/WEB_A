// src/App.tsx
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout/Layout';
import LoginPage from './pages/Auth/LoginPage';
import SignUpPage from './pages/Auth/SignUpPage';
import AgreementPage from './pages/Auth/AgreementPage';
import NicknamePage from './pages/Auth/NicknamePage';
import MyPage from './pages/Auth/MyPage';
import LoginCompletePage from './pages/Auth/LoginCompletePage';
import PasswordPage from './pages/Auth/PasswordPage';
import PrivacyPage from './pages/Auth/PrivacyPage';
import LogoutPage from './pages/Auth/Logout';
import WithdrawPage from './pages/Auth/WithdrawPage';
import ProfilePhotoPage from './pages/Auth/ProfilePhotoPage';
import Feed from './pages/Feed';
import ChatApp from './pages/ChatApp';
import ChatListPage from './pages/ChatListPage';
import Post from './pages/post';
import { PostWrite } from './components/post/PostWrite';
import Location from './pages/location'; // 대소문자 통일
import { PostProvider } from './contexts/PostContext';
import '@sendbird/uikit-react/dist/index.css';
import { SendbirdProvider } from '@sendbird/uikit-react/SendbirdProvider';
import Map from './pages/Map';

const myColorSet = {
  '--sendbird-light-primary-500': '#00487c',
  '--sendbird-light-primary-400': '#4bb3fd',
  '--sendbird-light-primary-300': '#3e6680',
  '--sendbird-light-primary-200': '#0496ff',
  '--sendbird-light-primary-100': '#027bce',
};

const queryClient = new QueryClient();

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
      { path: 'mypage', element: <MyPage /> },
      { path: 'location', element: <Location /> },
    ],
  },
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
  { path: 'post', element: <Post /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostProvider>
        <SendbirdProvider
          appId="B73D82D8-F243-43E5-9379-FAFB5F1FC574"
          userId="1234"
          colorSet={myColorSet}
        >
          <RouterProvider router={router} />
        </SendbirdProvider>
      </PostProvider>
    </QueryClientProvider>
  );
}

export default App;
