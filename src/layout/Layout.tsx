import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup']; // 푸터 숨기고 싶은 경로

  return (
    <div className="relative pt-[66px]">
      <Outlet />
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
    </div>
  );
};

export default Layout;
