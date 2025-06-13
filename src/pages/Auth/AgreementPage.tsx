import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AgreementPage() {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState({
    service: false,
    location: false,
    privacy: false,
  });

  const handleAllCheck = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setTermsChecked({
      service: newValue,
      location: newValue,
      privacy: newValue,
    });
  };

  const handleIndividualCheck = (key: keyof typeof termsChecked) => {
    const newState = { ...termsChecked, [key]: !termsChecked[key] };
    setTermsChecked(newState);
    setAllChecked(Object.values(newState).every(Boolean));
  };

  const handleSubmit = () => {
    navigate('/nickname'); // 닉네임 페이지로 이동
  };

  return (
    <div
      style={{
        padding: '25px',
        paddingBottom: '80px',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
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

      {/* 제목 */}
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
        <span style={{ color: '#297FB8' }}>SMP</span> 약관 동의
      </h1>

      {/* 전체 동의 체크박스 */}
      <div style={{ marginTop: '80px', marginBottom: '30px' }}>
        {/* ⬆ marginTop 추가로 아래 전체 레이아웃도 내려가도록 조정 */}
        <label style={checkboxLabelStyle}>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleAllCheck}
            style={checkboxStyle}
          />
          전체 동의
        </label>
      </div>

      <hr style={{ marginBottom: '50px' }} />

      {/* 개별 항목 체크박스 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        <label style={checkboxLabelStyle}>
          <input
            type="checkbox"
            checked={termsChecked.service}
            onChange={() => handleIndividualCheck('service')}
            style={checkboxStyle}
          />
          서비스 이용약관 (필수)
        </label>
        <label style={checkboxLabelStyle}>
          <input
            type="checkbox"
            checked={termsChecked.location}
            onChange={() => handleIndividualCheck('location')}
            style={checkboxStyle}
          />
          위치정보 이용 동의 (선택)
        </label>
        <label style={checkboxLabelStyle}>
          <input
            type="checkbox"
            checked={termsChecked.privacy}
            onChange={() => handleIndividualCheck('privacy')}
            style={checkboxStyle}
          />
          개인정보 수집·이용 (필수)
        </label>
      </div>

      {/* 확인 버튼 (전체동의 상태일 때만 하단에 고정) */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: allChecked
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(20px)',
          opacity: allChecked ? 1 : 0,
          transition: 'all 0.3s ease',
          width: '90%',
          maxWidth: '480px',
          zIndex: 100,
          pointerEvents: allChecked ? 'auto' : 'none',
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            height: '45px',
            backgroundColor: '#297FB8',
            color: 'white',
            fontWeight: 600,
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

const checkboxStyle = {
  marginRight: '10px',
  width: '16px',
  height: '16px',
};

const checkboxLabelStyle = {
  fontSize: '16px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
};
