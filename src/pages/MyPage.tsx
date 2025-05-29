import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegClipboard, FaClock, FaBookmark, FaHeart } from 'react-icons/fa';
import { FiSearch, FiSettings } from 'react-icons/fi';

export default function MyPage() {
  const navigate = useNavigate();

  const userNickname = localStorage.getItem('nickname') || '이름 없음';
  const profileImage = localStorage.getItem('profileImage') || '/images/default-profile.png';

  const handleTabClick = (tab: string) => {
    console.log(`${tab} 클릭됨`);
  };

  const handleChatClick = (channelUrl: string) => {
    navigate(`/chat/${encodeURIComponent(channelUrl)}`);
  };

  return (
    <div className="fixed top-6 left-0 right-0 max-w-sm mx-auto px-4 font-sans text-sm bg-white z-50 pb-10">
      {/* 상단 아이콘 */}
      <div className="flex justify-end gap-4 text-xl text-gray-600 mb-4">
        <FiSearch className="cursor-pointer" />
        <FiSettings className="cursor-pointer" onClick={() => navigate('/settings')} />
      </div>

      {/* 프로필 영역 */}
      <div className="flex flex-col items-start mb-6">
        <img src={profileImage} className="w-16 h-16 rounded-full mb-3" alt="profile" />
        <div className="text-lg font-semibold">{userNickname}</div>
      </div>

      {/* 회색 구분선 */}
      <hr className="border-t border-gray-300 mb-4" />

      {/* 회색 텍스트 제목 */}
      <div className="text-xs text-gray-500 mb-3">나의 활동</div>

      {/* 네 개의 탭 아이콘 */}
      <div className="flex justify-around mb-6 text-gray-700">
        <div
          onClick={() => handleTabClick('게시물')}
          className="flex flex-col items-center cursor-pointer"
        >
          <FaRegClipboard size={18} />
          <span className="text-xs mt-1">게시물</span>
        </div>
        <div
          onClick={() => handleTabClick('최근')}
          className="flex flex-col items-center cursor-pointer"
        >
          <FaClock size={18} />
          <span className="text-xs mt-1">최근</span>
        </div>
        <div
          onClick={() => handleTabClick('저장')}
          className="flex flex-col items-center cursor-pointer"
        >
          <FaBookmark size={18} />
          <span className="text-xs mt-1">저장</span>
        </div>
        <div
          onClick={() => handleTabClick('내 활동')}
          className="flex flex-col items-center cursor-pointer"
        >
          <FaHeart size={18} />
          <span className="text-xs mt-1">내 활동</span>
        </div>
      </div>

      {/* 회색 구분선 */}
      <hr className="border-t border-gray-300 mb-4" />

      {/* 참여 중인 오픈채팅 */}
      <div className="text-xs text-gray-500 mb-3">참여중인 오픈채팅</div>

      {/* 채팅 목록은 추후 API 연동 */}
      <div className="text-center text-gray-400 py-8">채팅 목록 불러오는 중...</div>
    </div>
  );
}
