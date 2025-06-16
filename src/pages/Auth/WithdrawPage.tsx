import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomConfirmModal from '../../components/popup/BottomConfirmModal';

export default function WithdrawPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const savedPassword = localStorage.getItem('userPassword') ?? '';
  const isPasswordMatch = password === savedPassword;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showToast, setShowToast] = useState(false); //  회색 알림용

  const handleWithdrawConfirm = () => {
    // 모든 유저 정보 삭제
    localStorage.clear();

    // 팝업 닫기 + 토스트 알림 띄우기
    setShowConfirmModal(false);
    setShowToast(true);

    // 3초 후 로그인 페이지로 이동
    setTimeout(() => {
      setShowToast(false);
      navigate('/login');
    }, 3000);
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
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            placeholder="비밀번호를 입력해 주세요."
            className={`w-full px-2 py-2 border-b text-sm focus:outline-none ${
              passwordError ? 'border-red-500 text-red-500' : 'border-gray-300'
            }`}
          />
          {passwordError && (
            <p className="text-xs text-red-500 mt-1 font-medium">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              if (!isPasswordMatch) {
                setPasswordError(true);
                return;
              }
              setPasswordError(false);
              setShowConfirmModal(true);
            }}
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

      {/*  하단 탈퇴 확인 팝업 */}
      <BottomConfirmModal
        isOpen={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleWithdrawConfirm}
        confirmText="확인"
        cancelText="취소"
      >
        정말 탈퇴하시겠습니까?
      </BottomConfirmModal>

      {/*  회색 알림 Toast */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg shadow z-[9999] whitespace-nowrap">
          회원탈퇴가 완료되었습니다.
        </div>
      )}
    </div>
  );
}
