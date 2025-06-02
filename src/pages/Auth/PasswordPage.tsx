import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mismatch, setMismatch] = useState(false);
  const [currentPasswordMismatch, setCurrentPasswordMismatch] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const savedPassword = localStorage.getItem('userPassword');

    if (currentPassword !== savedPassword) {
      setCurrentPasswordMismatch(true);
      return;
    } else {
      setCurrentPasswordMismatch(false);
    }

    if (newPassword !== confirmPassword) {
      setMismatch(true);
      return;
    } else {
      setMismatch(false);
    }

    localStorage.setItem('userPassword', newPassword);
    navigate(-1);
  };

  return (
    <div className="max-w-sm mx-auto p-4 pt-6 font-sans text-sm min-h-screen bg-white">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-1 py-3 mb-4">
        <button onClick={() => navigate(-1)} className="text-xl">
          ←
        </button>
        <div className="flex-grow text-center text-base font-semibold mr-6">비밀번호 변경</div>
      </div>

      {/* 회색 구분선 */}
      <hr className="border-t border-gray-300 mb-6 mt-2" />

      {/* 입력 필드 */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-10">
        <div>
          <label className="block text-sm font-semibold mb-1">현재 비밀번호</label>
          <input
            type="password"
            placeholder="현재 비밀번호 입력"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-full px-2 py-2 border-b text-sm focus:outline-none ${
              currentPasswordMismatch ? 'border-red-500 text-red-500' : 'border-gray-300'
            }`}
            required
          />
          {currentPasswordMismatch && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              현재 비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">새 비밀번호</label>
          <input
            type="password"
            placeholder="새 비밀번호 입력"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-2 py-2 border-b text-sm focus:outline-none border-gray-300`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">새 비밀번호 확인</label>
          <input
            type="password"
            placeholder="새 비밀번호 재입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-2 py-2 border-b text-sm focus:outline-none ${
              mismatch ? 'border-red-500 text-red-500' : 'border-gray-300'
            }`}
            required
          />
          {mismatch && (
            <p className="text-xs text-red-500 mt-1 font-medium">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          현재 비밀번호가 일치하는 경우 새 비밀번호로 변경할 수 있습니다.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button type="submit" className="px-6 py-2 rounded-full text-white bg-blue-500 text-sm">
            변경하기
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-full text-gray-400 bg-gray-200 text-sm"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordPage;
