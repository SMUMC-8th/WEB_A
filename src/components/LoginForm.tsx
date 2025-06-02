import { useState } from 'react';

export default function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    console.log('✅ 로그인 시도:', id, password);
    setError('');
    // 로그인 API 또는 이동 처리
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '0 20px', marginTop: '30px' }}>
      {/* 아이디 라벨 + 입력 */}
      <div style={inputWrapperStyle}>
        <label style={labelStyle}>아이디</label>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* 비밀번호 라벨 + 입력 */}
      <div style={inputWrapperStyle}>
        <label style={labelStyle}>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
