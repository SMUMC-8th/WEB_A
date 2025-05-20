// components/popup/PostOptionsModal.tsx
import React from 'react';

interface PostOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-64 rounded-lg shadow-lg overflow-hidden">
        <button
          className="w-full py-3 text-red-500 font-semibold border-b border-gray-200 hover:bg-gray-100"
          onClick={() => {
            alert('신고되었습니다.');
            onClose();
          }}
        >
          신고하기
        </button>
        <button
          className="w-full py-3 border-b border-gray-200 hover:bg-gray-100"
          onClick={() => {
            alert('공유 기능은 준비 중입니다.');
            onClose();
          }}
        >
          공유하기
        </button>
        <button className="w-full py-3 hover:bg-gray-100" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default PostOptionsModal;
