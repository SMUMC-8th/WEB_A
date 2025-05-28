import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Navbar />
    </div>
  );
};

export default Layout;
