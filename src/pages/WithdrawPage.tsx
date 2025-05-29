import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WithdrawPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const savedPassword = localStorage.getItem('userPassword') ?? '';
  const isPasswordMatch = password === savedPassword;

  const [showModal, setShowModal] = useState(false);

  const handleWithdrawConfirm = () => {
    localStorage.clear();
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div className="max-w-sm mx-auto font-sans text-sm min-h-screen bg-white pt-8 pb-10 relative">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 mb-4">
        <button onClick={() => navigate(-1)} className="text-lg">
          ←
        </button>
        <div className="text-base font-semibold">회원 탈퇴</div>
        <div className="w-6" />
      </div>

      {/* 본문 */}
      <div className="px-4 space-y-6 text-gray-800 leading-relaxed">
        <div>
          <p className="font-semibold text-sm mb-2">회원 탈퇴 전 주의사항</p>
          <p className="text-xs text-gray-600">
            회원에서 탈퇴하시면 현재 사용 중이신 계정을 더 이상 사용할 수 없습니다.
            <br />
            한 번 삭제된 계정은 복구할 수 없으며,
            <br />
            관련 정보 및 이력도 확인할 수 없습니다.
          </p>
        </div>

        <div>
          <p className="font-semibold text-sm mb-1 mt-4">비밀번호 입력</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요."
            className="w-full px-2 py-2 border-b border-gray-300 text-sm focus:outline-none"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowModal(true)}
            disabled={!isPasswordMatch}
            className={`flex-1 py-2 text-sm font-semibold rounded-full ${
              isPasswordMatch ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
            }`}
          >
            회원탈퇴
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-2 text-sm font-semibold rounded-full bg-gray-100 text-gray-600"
          >
            취소
          </button>
        </div>
      </div>

      {/* 팝업 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-2xl w-full max-w-sm p-6">
            <p className="text-center font-semibold text-sm mb-6">정말 탈퇴하시겠습니까?</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleWithdrawConfirm}
                className="w-full py-2 bg-blue-500 text-white rounded-full font-semibold"
              >
                확인
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 text-gray-500 font-semibold"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
