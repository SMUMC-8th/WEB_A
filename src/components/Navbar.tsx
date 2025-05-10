import { Link, useLocation } from 'react-router-dom';
import { FaMapMarkedAlt, FaHome, FaPlusSquare, FaCommentDots, FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/map', icon: <FaMapMarkedAlt />, key: 'map' },
    { to: '/feed', icon: <FaHome />, key: 'feed' },
    { to: '/post', icon: <FaPlusSquare />, key: 'post' },
    { to: '/chat', icon: <FaCommentDots />, key: 'chat' },
    { to: '/mypage', icon: <FaUserCircle />, key: 'mypage' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow z-50 p-[8px]">
      <ul className="flex justify-around items-center py-3 text-2xl">
        {links.map(({ to, icon, key }) => {
          const isActive = location.pathname === to;
          const baseStyle = 'flex flex-col items-center transition';
          const activeStyle = isActive ? 'text-blue-500' : 'text-gray-400';

          return (
            <li key={key}>
              <Link to={to} className={`${baseStyle} ${activeStyle}`}>
                {icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
