// [PostOptionModal] 컴포넌트
// 게시물 상세 보기(PostDetail) 화면에서 ⋯(점 세 개) 버튼 클릭 시 뜨는 옵션 모달입니다.
// 옵션: 관심 없음 / 사용자 추천 안 함 / 신고 / 태그 관심 없음
// React Portal을 사용하여 기존 DOM 밖에 모달을 띄워서 레이아웃 충돌을 방지합니다.

// Q. PostOptionModal(=게시물)에  NavBar 안보이게 하려고 z-index를 설정해서
//    여기에도 해놨습니다. 원래 하면 안되는 것 같은데.....

import Portal from './Portal';

interface Props {
  onClose: () => void; // 모달 닫기 함수 (바깥 영역 클릭 시 실행)
}

const PostOptionModal = ({ onClose }: Props) => {
  return (
    <Portal>
      <div
        className="fixed inset-0 z-[200]" // 모달 배경 오버레이
        onClick={onClose} // 배경 누르면 닫히기
      >
        <div
          className="absolute right-3 top-[180px] w-[210px] bg-gray-50 bg-opacity-80 rounded-xl shadow-lg"
          onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 닫힘 방지
        >
          {/* 옵션 버튼 */}
          <button className="w-full px-4 py-3 text-left text-sm">관심 없음</button>
          <div className="border-t border-gray-200" />
          <button className="w-full px-4 py-3 text-left text-sm">사용자 추천 안함</button>
          <div className="border-t border-gray-200" />
          <button className="w-full px-4 py-3 text-left text-sm ">신고</button>
          <div className="border-t border-gray-200" />
          <button className="w-full px-4 py-3 text-left text-sm">태그 관심 없음</button>
        </div>
      </div>
    </Portal>
  );
};

export default PostOptionModal;
