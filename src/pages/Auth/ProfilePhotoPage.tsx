import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api';
import { AxiosError } from 'axios';

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
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('JPEG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = async () => {
    if (!selectedFile) {
      alert('이미지를 선택해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // 여기가 문제였어용 key 값 이름이 달라서

    try {
      const response = await api.patch('/api/members/profile-image', formData);
      console.log('업로드 성공 응답:', response.data);

      alert('프로필 사진 업로드 완료');
      navigate('/');
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response) {
        console.error('서버 응답 에러:', axiosError.response.data);
        alert(`업로드 실패: ${axiosError.response.data.message || '에러 발생'}`);
      } else {
        console.error('요청 실패:', axiosError);
        alert('네트워크 오류 또는 서버 문제입니다.');
      }
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
