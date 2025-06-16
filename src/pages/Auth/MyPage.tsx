import { useEffect, useRef, useState } from 'react';
import { FaRegClipboard, FaClock, FaBookmark, FaHeart } from 'react-icons/fa';
import { FiSearch, FiSettings } from 'react-icons/fi';
import SettingsOptionModal from '../../components/popup/SettingsOptionModal';
import axiosInstance from '../../apis/axios';
import { AxiosError } from 'axios';

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [userNickname, setUserNickname] = useState('이름 없음');
  const [profileImage, setProfileImage] = useState('/images/default-profile.png');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/members');
        const { data } = res;
        if (data?.isSuccess && data.result) {
          setUserNickname(data.result.nickname || '이름 없음');
          setProfileImage(data.result.profileUrl || '/images/default-profile.png');
        }
      } catch (err) {
        console.error(' 사용자 정보 가져오기 실패:', err);
      }
    };
    fetchUserInfo();
  }, []);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('JPEG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axiosInstance.patch('/api/members/profile-image', formData);
      if (res?.data?.isSuccess) {
        alert('프로필 사진이 업데이트되었습니다.');
        setProfileImage(URL.createObjectURL(file));
      } else {
        alert('업데이트 실패: 서버 응답 오류');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response) {
        alert(`업로드 실패: ${axiosError.response.data.message || '에러 발생'}`);
      } else {
        alert('네트워크 오류 또는 서버 문제입니다.');
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case '게시물':
        return <div className="text-center py-6 text-gray-500">게시물 내용</div>;
      case '최근':
        return <div className="text-center py-6 text-gray-500">최근 본 항목</div>;
      case '저장':
        return <div className="text-center py-6 text-gray-500">저장한 항목</div>;
      case '내 활동':
        return <div className="text-center py-6 text-gray-500">내 활동 내역</div>;
      default:
        return (
          <div className="text-center py-6 text-gray-400">아래 탭을 눌러 내용을 확인해보세요.</div>
        );
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 max-w-sm mx-auto px-4 font-sans text-sm bg-white z-50 pb-10">
      <div className="flex justify-end gap-4 text-xl text-gray-600 mb-4">
        <FiSearch className="cursor-pointer" />
        <FiSettings className="cursor-pointer" onClick={() => setIsModalOpen(true)} />
      </div>

      <div className="flex flex-col items-start mb-6 relative">
        <div className="relative">
          <img src={profileImage} className="w-16 h-16 rounded-full mb-3" alt="profile" />
          <button
            onClick={handleAddImage}
            className="absolute -bottom-0.5 -right-0.5 w-6 h-6 text-xs bg-white border border-blue-500 rounded-full flex items-center justify-center"
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
        <div className="text-lg font-semibold mt-1">{userNickname}</div>
      </div>

      <hr className="border-t border-gray-300 mb-4" />
      <div className="text-xs text-gray-500 mb-3">나의 활동</div>

      <div className="flex justify-around mb-6 text-gray-700">
        {[
          { icon: <FaRegClipboard size={18} />, label: '게시물' },
          { icon: <FaClock size={18} />, label: '최근' },
          { icon: <FaBookmark size={18} />, label: '저장' },
          { icon: <FaHeart size={18} />, label: '내 활동' },
        ].map(({ icon, label }) => (
          <div
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex flex-col items-center cursor-pointer ${
              activeTab === label ? 'text-blue-500' : ''
            }`}
          >
            {icon}
            <span className="text-xs mt-1">{label}</span>
          </div>
        ))}
      </div>

      <hr className="border-t border-gray-300 mb-4" />
      {renderTabContent()}

      <SettingsOptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
