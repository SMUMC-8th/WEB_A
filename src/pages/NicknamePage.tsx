import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BottomConfirmModal from '../components/popup/BottomConfirmModal';

export default function NicknamePage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInvalid = nickname.length > 0 && (nickname.length < 2 || nickname.length > 8);

  const handleCheckDuplicate = () => {
    if (!isInvalid && nickname.trim() !== '') {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    console.log(`"${nickname}" 닉네임 선택됨`);
    localStorage.setItem('nickname', nickname); //  닉네임 저장
    setIsModalOpen(false);
    navigate('/logincomplete'); // 로그인 완료  페이지 이동
  };

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
          onClick={handleCheckDuplicate}
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

      {isInvalid && (
        <p style={{ color: 'red', fontSize: '13px', marginTop: '6px', paddingLeft: '2px' }}>
          닉네임은 2~8자 이내여야 합니다.
        </p>
      )}

      {/*  공용 팝업 컴포넌트 사용 */}
      <BottomConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
        confirmText="예"
        cancelText="아니오"
      >
        {nickname}님으로 하시겠습니까?
      </BottomConfirmModal>
    </div>
  );
}
