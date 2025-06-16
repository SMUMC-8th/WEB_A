import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupAPI from '../../apis/auth';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [message, setMessage] = useState(''); // 오류 무시

  const handleCheckNickname = () => {
    if (!nickname) return;
    const duplicatedNicknames = ['smugod', 'admin'];
    const isDup = duplicatedNicknames.includes(nickname.toLowerCase());
    setIsChecked(true);
    setIsAvailable(!isDup);
  };

  // 유효성 검사
  const isIdLengthValid = id.length >= 6 && id.length <= 12;
  const isIdFormatValid = /^[a-zA-Z0-9]+$/.test(id);
  const isIdValid = isIdLengthValid && isIdFormatValid;

  const isPasswordLengthValid = password.length >= 8 && password.length <= 12;
  const isPasswordMatch = password && passwordConfirm && password === passwordConfirm;

  const isFormValid =
    isChecked && isAvailable && isIdValid && isPasswordLengthValid && isPasswordMatch && nickname;

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const json = JSON.stringify({
        loginId: id,
        nickname: nickname,
        password: password,
      });
      formData.append('SignUp', new Blob([json], { type: 'application/json' }));

      await SignupAPI(formData);
      alert('회원가입 성공');
      navigate('/logincomplete');
    } catch (error) {
      alert('회원가입 실패');
      console.error('에러 응답:', error);
    }
  };

  return (
    <div
      style={{
        padding: '25px',
        paddingTop: '170px',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div
        onClick={() => navigate(-1)}
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
          position: 'absolute',
          top: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '20px',
          fontWeight: 700,
          margin: 0,
        }}
      >
        <span style={{ color: '#297FB8' }}>SMP</span> 회원가입
      </h1>

      {/* 닉네임 */}
      <div style={{ marginBottom: '40px' }}>
        <label style={labelStyle}>닉네임</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsChecked(false);
              setIsAvailable(false);
            }}
            style={{
              ...inputStyle,
              borderBottom: isChecked
                ? isAvailable
                  ? '2px solid #297FB8'
                  : '2px solid red'
                : '1.5px solid #ccc',
              color: isChecked && !isAvailable ? 'red' : 'inherit',
            }}
          />
          <button
            onClick={handleCheckNickname}
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
          <p style={{ ...guideStyle, color: isAvailable ? '#297FB8' : 'red', fontWeight: 500 }}>
            {isAvailable ? '사용 가능한 닉네임입니다.' : '이미 존재하는 닉네임입니다.'}
          </p>
        )}
        {!isChecked && <p style={guideStyle}>닉네임을 입력해주세요.</p>}
      </div>

      {/* 아이디 */}
      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>아이디</label>
        <input
          type="text"
          placeholder="아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            ...inputStyle,
            borderBottom: id.length > 0 && !isIdValid ? '2px solid red' : '1.5px solid #ccc',
            color: id.length > 0 && !isIdValid ? 'red' : 'inherit',
          }}
        />
        {id.length > 0 && !isIdValid && (
          <p style={{ ...guideStyle, color: 'red' }}>
            아이디는 6~12자의 영문, 숫자만 사용 가능합니다.
          </p>
        )}
      </div>

      {/* 비밀번호 */}
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
              password.length > 0 && !isPasswordLengthValid ? '2px solid red' : '1.5px solid #ccc',
            color: password.length > 0 && !isPasswordLengthValid ? 'red' : 'inherit',
          }}
        />
        {password.length > 0 && !isPasswordLengthValid && (
          <p style={{ ...guideStyle, color: 'red' }}>
            비밀번호는 8~12자의 영문, 숫자만 사용 가능합니다.
          </p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div style={{ marginBottom: '40px' }}>
        <label style={labelStyle}>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 재입력"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          style={{
            ...inputStyle,
            borderBottom:
              passwordConfirm.length > 0 && !isPasswordMatch ? '2px solid red' : '1.5px solid #ccc',
            color: passwordConfirm.length > 0 && !isPasswordMatch ? 'red' : 'inherit',
          }}
        />
        {passwordConfirm.length > 0 && !isPasswordMatch && (
          <p style={{ ...guideStyle, color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
        )}
      </div>

      <button
        style={{
          ...confirmButtonStyle,
          backgroundColor: isFormValid ? '#297FB8' : '#ddd',
          color: isFormValid ? 'white' : '#888',
          cursor: isFormValid ? 'pointer' : 'default',
        }}
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        확인
      </button>
    </div>
  );
}

// 스타일 정의
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
  paddingLeft: '2px',
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
