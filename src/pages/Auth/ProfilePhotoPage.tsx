import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api'; // ← axiosInstance 가져오기

export default function ProfilePhotoPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); //  실제 파일 저장

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setPreviewUrl(base64data); // 미리보기용
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile); // key 이름은 Swagger 명세와 맞춰야 함

    try {
      await api.post('/api/members/profile-image', formData); // 쿠키 인증 포함된 요청
      alert('프로필 사진 업로드 완료');
      navigate('/logincomplete'); // 또는 메인 페이지 등
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
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
        <span style={{ color: '#297FB8' }}>프로필 사진</span> 설정
      </h1>

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
