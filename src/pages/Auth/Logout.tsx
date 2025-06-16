import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    //  localStorage 초기화
    localStorage.removeItem('userId');
    localStorage.removeItem('userPassword');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileImage');

    // 초기  로그인 페이지로 이동
    navigate('/login');
  }, [navigate]);

  return null; // 즉시 리디렉션하므로 화면엔 아무것도 안 보여줘도 됨
}
