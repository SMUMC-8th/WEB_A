// src/App.tsx
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Map from './pages/Map';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AgreementPage from './pages/AgreementPage';
import NicknamePage from './pages/NicknamePage';

const router = createBrowserRouter([
  {
    path: '/', // Layout이 포함된 페이지 그룹
    element: <Layout />,
    errorElement: <div>404 에러 발생 관리자에게 문의하세요!</div>,
    children: [
      { path: '/map', element: <Map /> },
      { path: '/feed', element: <div>피드입니다.</div> },
      { path: '/post', element: <div>게시글 작성하기입니다.</div> },
      { path: '/chat', element: <div>채팅입니다.</div> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/mypage', element: <div>마이페이지입니다.</div> },
    ],
  },
  {
    path: '/agreement', // 이 페이지만 Layout 제외 (푸터 안 보이게....
    element: <AgreementPage />,
  },
  { path: '/nickname', element: <NicknamePage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
