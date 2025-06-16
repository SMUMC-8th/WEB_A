import { Link, useLocation } from 'react-router-dom';
import { House, MessagesSquare, UserRound, CirclePlus, Newspaper } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/map', icon: <House size={28} />, key: 'map' },
    { to: '/feed', icon: <Newspaper size={28} />, key: 'feed' },
    { to: '/post', icon: <CirclePlus size={28} />, key: 'post' },
    { to: '/chat', icon: <MessagesSquare size={28} />, key: 'chat' },
    { to: '/mypage', icon: <UserRound size={28} />, key: 'mypage' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow z-50 p-[13px] rounded-t-2xl">
      <ul className="flex justify-around items-center py-3 text-3xl">
        {links.map(({ to, icon, key }) => {
          const isActive = location.pathname === to;
          const baseStyle = 'flex flex-col items-center transition';
          const activeStyle = isActive ? 'text-gray-500' : 'text-gray-300';

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
