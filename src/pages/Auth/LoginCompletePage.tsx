import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginCompletePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000); // 1초 후 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate]);

  return (
    <div
      style={{
        padding: '25px',
        maxWidth: '480px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <img src="/image/SMP.png" alt="SMP 로고" style={{ width: '120px', marginBottom: '40px' }} />
      <p style={{ fontSize: '20px', fontWeight: 600 }}>로그인 완료!</p>
    </div>
  );
}
