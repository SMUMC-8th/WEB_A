import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePhotoPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAddImage = () => {
    fileInputRef.current?.click(); // input 열기
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // 임시 URL 생성
      setPreviewUrl(url);
    }
  };

  const handleConfirm = () => {
    // 이후 업로드 로직 추가 가능
    localStorage.setItem('profileImage', previewUrl || '');
    navigate('/logincomplete'); // 또는 회원가입 완료 페이지
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

      {/* 타이틀 */}
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 700,
          marginTop: '60px',
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#297FB8' }}>프로필 사진</span> 설정
      </h1>

      {/* 프로필 원형 영역 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          onClick={handleAddImage}
          style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            backgroundColor: '#ddd',
            backgroundImage: previewUrl ? `url(${previewUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
          }}
        >
          {/* 카메라 아이콘 버튼 */}
          <button
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '1px solid #297FB8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            📷
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* 확인 버튼 */}
      <button
        onClick={handleConfirm}
        disabled={!previewUrl}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '25px',
          right: '25px',
          height: '48px',
          backgroundColor: previewUrl ? '#297FB8' : '#eee',
          color: previewUrl ? 'white' : '#aaa',
          fontWeight: 600,
          fontSize: '16px',
          borderRadius: '25px',
          border: 'none',
          cursor: previewUrl ? 'pointer' : 'default',
        }}
      >
        확인
      </button>
    </div>
  );
}
