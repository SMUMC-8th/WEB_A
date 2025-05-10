import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Layout = () => {
  return (
    <div className="relative pt-[66px]">
      <Outlet />
      <Navbar />
    </div>
  );
};
export default Layout;
