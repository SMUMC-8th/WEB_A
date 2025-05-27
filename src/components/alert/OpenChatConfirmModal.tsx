// OpenChatConfirmModal.tsx
// 오픈채팅방 들어갈 때 다시 확인하는 모달
// 오픈채팅방이 있을 때만 활성화

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  placeName: string; // 장소 이름 (ex. '윤가네')
  openUrl: string; // 오픈채팅방 링크
  onClose: () => void; // 모달 닫는 함수
}

function OpenChatConfirmModal({ placeName, openUrl, onClose }: Props) {
  return (
    <AnimatePresence>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30"
        onClick={onClose} // 배경 클릭 시 닫힘
      >
        {/* 모달 본체 */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} // 첫 등장 시
          animate={{ scale: 1, opacity: 1 }} // 보여질 때
          exit={{ scale: 0.9, opacity: 0 }} // 사라질 때
          transition={{ duration: 0.2 }}
          className="bg-white w-[300px] rounded-2xl p-6 shadow-lg text-center"
          onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
        >
          {/* 입장 확인 문구*/}
          <p className="text-gray-800 text-base font-semibold mb-6 whitespace-pre-line leading-relaxed">
            {`‘${placeName}’ 오픈채팅방으로\n입장하시겠습니까?`}
          </p>

          {/* 버튼 그룹 */}
          <div className="flex justify-center gap-4">
            {/* 확인 버튼 */}
            <button
              onClick={() => {
                window.open(openUrl, '_blank', 'noopener,noreferrer');
                onClose();
              }}
              className="bg-[#3273FF] text-white px-6 py-2 rounded-full font-medium shadow
                         hover:bg-[#1e60c7] active:scale-95 transition-all duration-200"
            >
              확인
            </button>

            {/* 취소 버튼 */}
            <button
              onClick={onClose}
              className="text-gray-500 px-6 py-2 rounded-full font-medium
                         hover:bg-gray-100 active:scale-95 transition-all duration-200"
            >
              취소
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default OpenChatConfirmModal;
