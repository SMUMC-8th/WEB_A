import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Portal from '../Portal';
import BottomConfirmModal from './BottomConfirmModal'; // 공용 모달 가져오기

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsOptionModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalInfo, setConfirmModalInfo] = useState<{
    text: string;
    path: string;
  }>({ text: '', path: '' });

  const openConfirm = (text: string, path: string) => {
    setConfirmModalInfo({ text, path });
    setConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    setConfirmModalOpen(false);
    onClose(); // 옵션 모달 닫기
    navigate(confirmModalInfo.path);
  };

  if (!isOpen) return null;

  return (
    <>
      <Portal>
        <div className="fixed inset-0 z-[9999]" onClick={onClose}>
          <div
            className="absolute right-4 top-12 w-[220px] rounded-2xl overflow-hidden bg-gray-100 shadow-xl border border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-gray-200 transition-colors"
              onClick={() => openConfirm('비밀번호를 변경하시겠습니까?', '/password')}
            >
              비밀번호 변경
            </button>

            <button
              className="w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-gray-200 transition-colors border-t border-gray-300"
              onClick={() => openConfirm('개인정보 처리방침으로 이동하시겠습니까까?', '/privacy')}
            >
              개인정보 처리방침
            </button>

            <button
              className="w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-gray-200 transition-colors border-t border-gray-300"
              onClick={() => openConfirm('로그아웃 하시겠습니까?', '/logout')}
            >
              로그아웃
            </button>

            <button
              className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-100 transition-colors border-t border-gray-300"
              onClick={() => openConfirm('정말 탈퇴하시겠습니까?', '/withdraw')}
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </Portal>

      {/*  공용 확인 모달 */}
      <BottomConfirmModal
        isOpen={confirmModalOpen}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmModalOpen(false)}
        confirmText="확인"
        cancelText="취소"
      >
        {confirmModalInfo.text}
      </BottomConfirmModal>
    </>
  );
};

export default SettingsOptionModal;
