import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Map from './pages/Map';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 에러 발생 관리자에게 문의하세요!</div>,
    children: [
      {
        path: '/map',
        element: <Map />,
      },
      {
        path: '/feed',
        element: <div>피드입니다.</div>,
      },
      {
        path: '/post',
        element: <div>게시글 작성하기입니다.</div>,
      },
      {
        path: '/chat',
        element: <div>채팅입니다.</div>,
      },
      {
        path: '/mypage',
        element: <div>마이페이지입니다.</div>,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
