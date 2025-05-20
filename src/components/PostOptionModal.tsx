// [PostOptionModal] 컴포넌트

// 게시물 상세 보기(PostDetail) 화면에서 ⋯(점 세 개) 버튼 클릭 시 뜨는 옵션 모달입니다.
// 옵션: 관심 없음 / 사용자 추천 안 함 / 신고 / 태그 관심 없음
// React Portal을 사용하여 기존 DOM 밖에 모달을 띄워서 레이아웃 충돌을 방지합니다.

import Portal from './Portal';

interface Props {
  onClose: () => void; // 모달 닫기 함수 (바깥 영역 클릭 시 실행)
  // onSelect: (option: 'hide' | 'no-recommend' | 'report' | 'tag-hide') => void; // 선택 함수 props
}

const PostOptionModal = ({ onClose }: Props) => {
  return (
    <Portal>
      {/* 모달 배경 오버레이 (검은 배경 없이 투명하게 클릭 영역 확보) */}
      <div
        className="fixed inset-0 z-[200]"
        onClick={onClose} // 배경 클릭 시 모달 닫힘
      >
        {/* 옵션 모달 본체 */}
        <div
          className="absolute right-4 top-12 w-[220px] bg-white rounded-xl shadow-lg border border-gray-200"
          onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
        >
          {/* 옵션 버튼 목록 */}
          <button
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
            // onClick={() => onSelect('hide')}
          >
            관심 없음
          </button>
          <div className="border-t border-gray-200" />
          <button
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
            // onClick={() => onSelect('no-recommend')}
          >
            사용자 추천 안 함
          </button>
          <div className="border-t border-gray-200" />
          <button
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
            // onClick={() => onSelect('report')}
          >
            신고
          </button>
          <div className="border-t border-gray-200" />
          <button
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
            // onClick={() => onSelect('tag-hide')}
          >
            태그 관심 없음
          </button>
        </div>
      </div>
    </Portal>
  );
};

export default PostOptionModal;
