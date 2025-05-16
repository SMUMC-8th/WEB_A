import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <div className="relative w-full h-[calc(100vh-66px)] overflow-hidden">
      <Outlet />
      <Navbar />
    </div>
  );
};
export default Layout;
