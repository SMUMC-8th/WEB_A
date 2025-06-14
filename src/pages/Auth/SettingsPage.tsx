import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto font-sans text-sm min-h-screen bg-white pt-8">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 mb-4">
        <button onClick={() => navigate(-1)} className="text-lg">
          ←
        </button>
        <div className="text-base font-semibold">계정 설정</div>
        <div className="w-6" /> {/* 빈 공간으로 가운데 정렬 유지 */}
      </div>

      <div className="p-4 pt-2">
        <div className="space-y-6">
          <button onClick={() => navigate('/settings/password')} className="block text-left w-full">
            비밀번호 변경
          </button>
          <button onClick={() => navigate('/settings/privacy')} className="block text-left w-full">
            개인정보 처리방침
          </button>

          <div className="mt-10 space-y-6">
            <button onClick={() => navigate('/settings/logout')} className="block text-left w-full">
              로그아웃
            </button>
            <button
              onClick={() => navigate('/settings/withdraw')}
              className="block text-left w-full"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
