import { useNavigate } from 'react-router-dom';

export default function LoginFooter() {
  const navigate = useNavigate(); // ✅ 꼭 호출해야 함!

  return (
    <div style={footerContainerStyle}>
      <button
        style={signupButtonStyle}
        onClick={() => navigate('/signup')} // ✅ 페이지 이동 연결!
      >
        회원가입
      </button>

      <button style={kakaoButtonStyle}>💬 카카오톡으로 시작하기</button>
    </div>
  );
}

const footerContainerStyle = {
  padding: '0 20px',
  marginTop: '80px',
  marginBottom: '100px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '12px',
};

//  회원가입 버튼
const signupButtonStyle = {
  height: '45px',
  borderRadius: '25px',
  backgroundColor: '#f0f0f0',
  color: '#333',
  fontSize: '16px',
  fontWeight: 600,
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
};

//  카카오 버튼
const kakaoButtonStyle = {
  height: '45px',
  borderRadius: '25px',
  backgroundColor: '#FEE500',
  color: '#000',
  fontSize: '16px',
  fontWeight: 600,
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // ✨ 그림자 효과 추가
  cursor: 'pointer',
};
