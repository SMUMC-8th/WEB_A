import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleCheckId = () => {
    if (!id) return;
    const duplicatedIds = ['smugod', 'admin'];
    const isDup = duplicatedIds.includes(id.toLowerCase());
    setIsChecked(true);
    setIsAvailable(!isDup);
  };

  const isPasswordLengthValid = password.length >= 8 && password.length <= 12;
  const isPasswordMatch = password && passwordConfirm && password === passwordConfirm;
  const isFormValid = isChecked && isAvailable && isPasswordMatch && isPasswordLengthValid;

  return (
    <div
      style={{
        padding: '25px',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <div
        onClick={() => navigate('/login')}
        style={{
          position: 'absolute',
          top: '10px',
          left: '25px',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        ←
      </div>

      <h1
        style={{
          fontSize: '24px',
          fontWeight: 700,
          paddingTop: '0px',
          marginTop: '-10px',
          marginBottom: '60px',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#297FB8' }}>SMP</span> 회원가입
      </h1>

      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>아이디</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setIsChecked(false);
              setIsAvailable(false);
            }}
            style={{
              ...inputStyle,
              borderBottom: isChecked
                ? isAvailable
                  ? '2px solid #297FB8'
                  : '2px solid red'
                : '1px solid #ccc',
              color: isChecked && !isAvailable ? 'red' : 'inherit',
            }}
          />
          <button
            onClick={handleCheckId}
            style={{
              ...checkButtonStyle,
              backgroundColor: isChecked ? '#ccc' : '#297FB8',
              color: isChecked ? '#666' : 'white',
              cursor: isChecked ? 'default' : 'pointer',
            }}
          >
            중복확인
          </button>
        </div>
        {isChecked && (
          <p
            style={{
              ...guideStyle,
              color: isAvailable ? '#297FB8' : 'red',
              fontWeight: 500,
            }}
          >
            {isAvailable ? '사용 가능한 아이디입니다.' : '이미 존재하는 아이디입니다.'}
          </p>
        )}
        {!isChecked && <p style={guideStyle}>아이디는 6~12자의 영문, 숫자만 사용 가능합니다.</p>}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...inputStyle,
            borderBottom:
              password.length > 0 && !isPasswordLengthValid ? '2px solid red' : '1px solid #ccc',
            color: password.length > 0 && !isPasswordLengthValid ? 'red' : 'inherit',
          }}
        />
        {password.length > 0 && !isPasswordLengthValid && (
          <p style={{ ...guideStyle, color: 'red' }}>
            비밀번호는 8~12자의 영문, 숫자만 사용 가능합니다.
          </p>
        )}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <input
          type="password"
          placeholder="비밀번호 재입력"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* ✅ 확인 버튼 클릭 시 약관 동의 페이지로 이동 */}
      <button
        style={{
          ...confirmButtonStyle,
          backgroundColor: isFormValid ? '#297FB8' : '#ddd',
          color: isFormValid ? 'white' : '#888',
          cursor: isFormValid ? 'pointer' : 'default',
        }}
        disabled={!isFormValid}
        onClick={() => {
          if (isFormValid) {
            navigate('/agreement');
          }
        }}
      >
        확인
      </button>
    </div>
  );
}

const labelStyle = {
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '6px',
  display: 'block',
  textAlign: 'left' as const,
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: 'none',
  borderBottom: '1px solid #ccc',
  backgroundColor: 'transparent',
  fontSize: '16px',
  outline: 'none',
};

const checkButtonStyle = {
  flexShrink: 0,
  padding: '8px 12px',
  backgroundColor: '#297FB8',
  color: 'white',
  borderRadius: '20px',
  border: 'none',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, color 0.3s ease',
};

const guideStyle = {
  fontSize: '12px',
  color: '#666',
  marginTop: '6px',
};

const confirmButtonStyle = {
  width: '100%',
  height: '45px',
  backgroundColor: '#ddd',
  color: '#888',
  fontWeight: 600,
  borderRadius: '25px',
  border: 'none',
  transition: 'background-color 0.3s ease, color 0.3s ease',
};
