import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NicknamePage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  const isInvalid = nickname.length > 0 && (nickname.length < 2 || nickname.length > 8);

  return (
    <div
      style={{
        padding: '25px',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/* ← 뒤로가기 */}
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
          fontSize: '24px',
          fontWeight: 700,
          marginTop: '60px',
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#297FB8' }}>닉네임</span> 설정
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            border: 'none',
            borderBottom: isInvalid ? '1.5px solid red' : '1.5px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            color: isInvalid ? 'red' : 'inherit',
          }}
        />
        <button
          style={{
            padding: '8px 12px',
            backgroundColor: '#297FB8',
            color: 'white',
            fontSize: '13px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          중복확인
        </button>
      </div>

      {/*  에러 메시지 출력 */}
      {isInvalid && (
        <p style={{ color: 'red', fontSize: '13px', marginTop: '6px', paddingLeft: '2px' }}>
          닉네임은 2~8자 이내여야 합니다.
        </p>
      )}
    </div>
  );
}
