// src/App.tsx
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Map from './pages/Auth/Map';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 에러 발생 관리자에게 문의하세요!</div>,
    children: [
      { path: '/map', element: <Map /> },
      { path: '/feed', element: <div>피드입니다.</div> },
      { path: '/post', element: <div>게시글 작성하기입니다.</div> },
      { path: '/chat', element: <div>채팅입니다.</div> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/mypage', element: <MyPage /> },
    ],
  },
  {
    path: '/agreement',
    element: <AgreementPage />,
  },
  { path: '/nickname', element: <NicknamePage /> },
  { path: '/logincomplete', element: <LoginCompletePage /> },
  { path: '/password', element: <PasswordPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/logout', element: <LogoutPage /> },
  { path: '/withdraw', element: <WithdrawPage /> },
  { path: '/profilephoto', element: <ProfilePhotoPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
