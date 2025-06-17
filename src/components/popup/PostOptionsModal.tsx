import Portal from '../Portal';

interface Props {
  onClose: () => void;
  position: { x: number; y: number };
}

const PostOptionsModal = ({ onClose, position }: Props) => {
  return (
    <Portal>
      <div className="fixed inset-0 pointer-events-auto" onClick={onClose}>
        <div
          className="absolute bg-white rounded-xl shadow-lg border border-gray-200"
          style={{
            top: position.y + 8, // 버튼 아래로 약간 띄움
            left: position.x - 220, // 모달 width 만큼 왼쪽으로 이동 (220px)
            width: '220px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">관심 없음</button>
          <div className="border-t border-gray-200" />
          <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">
            사용자 추천 안 함
          </button>
          <div className="border-t border-gray-200" />
          <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">신고</button>
          <div className="border-t border-gray-200" />
          <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">
            태그 관심 없음
          </button>
        </div>
      </div>
    </Portal>
  );
};

export default PostOptionsModal;
