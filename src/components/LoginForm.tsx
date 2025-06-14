import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/auth'; // 상대 경로 확인 필요

export default function LoginForm() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!id || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      console.log(' 로그인 시도:', id, password);
      const result = await loginAPI(id, password);

      if (result && result.accessToken) {
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('nickname', result.result.nickname); //다시 저장해야함
        alert('로그인 성공 ');
        navigate('/mypage');
      } else {
        throw new Error('서버 응답에 accessToken이 없습니다.');
      }
    } catch (err) {
      console.error(' 로그인 실패:', err);
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '0 20px', marginTop: '30px' }}>
      {/* 아이디 입력 */}
      <div style={inputWrapperStyle}>
        <label style={labelStyle}>아이디</label>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* 비밀번호 입력 */}
      <div style={inputWrapperStyle}>
        <label style={labelStyle}>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* 에러 메시지 */}
      {error && <div style={errorStyle}>* {error}</div>}

      {/* 로그인 버튼 */}
      <button type="submit" style={buttonStyle}>
        로그인
      </button>
    </form>
  );
}

// 스타일 정의
const inputWrapperStyle = {
  marginBottom: '8px',
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#000',
  marginBottom: '4px',
  display: 'block',
  textAlign: 'left' as const,
};

const inputStyle = {
  width: '100%',
  height: '40px',
  padding: '0',
  margin: '0',
  border: 'none',
  borderBottom: '1px solid #ccc',
  background: 'transparent',
  color: '#333',
  fontSize: '16px',
  outline: 'none',
  fontFamily: 'inherit',
};

const buttonStyle = {
  marginTop: '5px',
  width: '100%',
  height: '45px',
  borderRadius: '25px',
  backgroundColor: '#297FB8',
  color: 'white',
  fontSize: '16px',
  border: 'none',
  cursor: 'pointer',
};

const errorStyle = {
  color: '#FF5005',
  fontSize: '12px',
  marginBottom: '10px',
};
