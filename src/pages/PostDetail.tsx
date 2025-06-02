// [PostDetail.tsx]
// 게시물 상세 모달 페이지

// import { postHide, postNoRecommend, postReport, postTagHide } from '../apis/postOption'; // ← API 함수 import

import { motion, useDragControls, PanInfo } from 'framer-motion';
import { MoreHorizontal, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import PostOptionModal from '../components/alert/PostOptionModal';
import { Post } from '../types/Post';

// 부모 컴포넌트에서 전달받을 props 정의
interface Props {
  post: Post; // 게시물 데이터
  onClose: () => void; // 모달 닫기 함수
}

// 드래그 위치에 따른 모달 상태
type ModalState = 'closed' | 'mid' | 'full';

function PostDetail({ post, onClose }: Props) {
  const [showOptions, setShowOptions] = useState(false); // 점 세개 옵션 모달 상태
  const [modalState, setModalState] = useState<ModalState>('mid'); // 모달 상태 (초기값은 중간)
  const dragControls = useDragControls(); // 드래그 컨트롤러

  // 모달이 열릴 때 네브바 숨김
  useEffect(() => {
    const navbar = document.querySelector('nav') as HTMLElement | null;
    if (navbar) {
      navbar.classList.add('!hidden'); // Tailwind 우선순위 이김
    }
    return () => {
      if (navbar) {
        navbar.classList.remove('!hidden');
      }
    };
  }, []);

  // 드래그 종료 시 y 위치에 따라 모달 상태 전환
  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    const y = info.point.y; // 드래그 끝 위치의 y 좌표

    // 아래로 많이 내리면 모달 닫기
    if (y > window.innerHeight * 0.6) {
      setModalState('closed');
      onClose(); // 모달 닫기
    }
    // 위로 많이 올리면 전체 화면으로 확장
    else if (y < window.innerHeight * 0.3) {
      setModalState('full');
    }
    // 그 외에는 중간 상태 유지
    else {
      setModalState('mid');
    }
  };

  // 모달 상태에 따라 y 위치 반환
  const getModalY = () => {
    switch (modalState) {
      case 'full':
        return 0; // 전체 화면 = 상단까지 붙임
      case 'mid':
        return window.innerHeight * 0.2; // 아래에서 20% 만큼 보이도록
      case 'closed':
      default:
        return '100%'; // 완전히 숨김
    }
  };

  // 모달 상태에 따른 높이 설정 (style.height에 적용됨)
  const getModalHeight = () => {
    switch (modalState) {
      case 'full':
        return '100vh';
      case 'mid':
        return '80vh';
      default:
        return '0';
    }
  };

  // // postOptionModal 에서 선택된 옵션 값을 서버에 요청 보내고 성공 여부 확인
  // const handleOptionSelect = async (option: 'hide' | 'no-recommend' | 'report' | 'tag-hide') => {
  //   try {
  //     switch (option) {
  //       case 'hide':
  //         await postHide(post.id);
  //         alert('관심 없음 처리 완료');
  //         break;
  //       case 'no-recommend':
  //         await postNoRecommend(post.authorId);
  //         alert('사용자 추천 안 함 처리 완료');
  //         break;
  //       case 'report':
  //         await postReport(post.id);
  //         alert('신고 완료');
  //         break;
  //       case 'tag-hide':
  //         await postTagHide(post.tags); // post.tags는 string[] 형태여야 함
  //         alert('태그 관심 없음 처리 완료');
  //         break;
  //     }
  //   } catch (error) {
  //     alert('요청 실패: ' + (error as Error).message);
  //   } finally {
  //     setShowOptions(false); // 모달 닫기
  //   }
  // };

  return (
    <>
      {/* 배경 오버레이 */}
      <motion.div
        className="fixed inset-0 bg-black/30 z-20"
        onClick={onClose} // 클릭 시 모달 닫힘
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* 상세 모달 본체 */}
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50 overflow-hidden flex flex-col"
        drag="y" // 수직 드래그 활성화
        dragConstraints={{ top: 0, bottom: 0 }} // 위/아래 드래그 제한
        // drag는 기본적으로 자유롭게 움직이게 되어 있어서, 제한 걸어놓고 지정 위치로 animate만 수행하도록 제어

        dragElastic={0.2} // 탄성 설정
        onDragEnd={handleDragEnd} // 드래그 종료 시 호출
        initial={{ y: '100%' }} // 처음엔 화면 밖에서 시작
        animate={{ y: getModalY() }} // 상태에 따라 y 좌표 이동
        exit={{ y: '100%' }} // 닫을 때 다시 아래로
        transition={{ type: 'spring', stiffness: 300, damping: 30 }} // 스프링 애니메이션
        style={{
          height: getModalHeight(), // 상태에 따라 높이 조절
        }}
      >
        {/* 드래그 핸들 -> 시각적으로 올릴 수 있게 함 */}
        <div
          className="w-full h-6 flex justify-center items-center cursor-grab"
          onPointerDown={(e) => dragControls.start(e)} // 포인터 누르면 드래그 시작
        >
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mt-2" />
        </div>

        {/* 상단 작성자 정보 + 점 버튼 */}
        <div className="flex items-center justify-between px-4 pt-2">
          <div className="flex items-center gap-3">
            {/* 프로필 */}
            <img src="" alt="profile" className="w-10 h-10 rounded-full bg-black object-cover" />
            <div className="flex flex-col items-start gap-1 text-left">
              {/* 작성자 */}
              <span className="text-sm font-semibold">{post.author}</span>

              {/* 장소 */}
              <span className="text-xs text-gray-500">{post.title}</span>
            </div>
          </div>

          <MoreHorizontal
            className="w-5 h-5 text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(true);
            }}
          />
          {/* 점 세개 옵션 모달 */}
          {showOptions && (
            <PostOptionModal onClose={() => setShowOptions(false)} /> //onSelect={handleOptionSelect}
          )}
        </div>

        {/* 게시물 이미지 */}
        <div className="relative w-full mt-4" style={{ paddingTop: '100%' }}>
          <img
            src={post.thumbnail}
            alt={post.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* 댓글, 좋아요, 공유, 북마크 아이콘 */}
        <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {/* 댓글 */}
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.commentCount}</span>
            </div>

            {/* 좋아요 */}
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>

            {/* 카카오 지도로 이동 */}
            <a
              // 카카오맵 형식: https://map.kakao.com/link/map/장소명,위도,경도
              href={`https://map.kakao.com/link/map/${encodeURIComponent(post.title)},${post.lat},${
                post.lng
              }`}
              target="_blank" // 카카오맵 새 창으로 열림
              rel="noopener noreferrer" // 보안 및 성능 향상용 설정?
              className="flex items-center gap-1 hover:underline"
            >
              {/* <MapPinned className="w-4 h-4" /> */}
              <span>{post.title}</span>
            </a>
          </div>

          {/* 공유, 북마크 아이콘 */}
          <div className="flex items-center gap-4">
            <Share className="w-4 h-4" />
            <Bookmark className="w-4 h-4" />
          </div>
        </div>

        {/* 게시물 설명 및 해시태그 */}
        <div className="px-4 pb-6 text-sm text-gray-500 text-left mt-3">
          {/* 설명 한 줄만 보이고 말 줄임표 적용 */}
          <div className="mb-1 w-full truncate">{post.description}</div>
          {/* 태그 */}
          <div className="text-blue-600 font-medium">
            #성신여대 #성신여대맛집 #김치볶음밥 #스테이크
          </div>
        </div>

        {/* 오픈채팅 아이콘 */}
        <div className="flex justify-center mt-2">
          <button
            onClick={() => {
              const url = post.openChatUrl || 'https://open.kakao.com/'; // 오픈채팅 링크가 존재하면 링크로 이동, 없으면 오픈채팅 만들기 유도
              window.open(url, '_blank', 'noopener,noreferrer'); // 새 탭에서 열기
            }}
            className="flex items-center gap-2 bg-white text-sm px-4 py-2 rounded-full shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <MessageCircle className="w-4 h-4 text-blue-600" />

            {/* 버튼 내부 텍스트 */}
            <span className="text-gray-800 font-medium">
              {/* 링크 있으면 이동, 없으면 만들기 */}
              {post.openChatUrl ? '오픈채팅방으로 이동' : '오픈채팅방 만들기'}
            </span>
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default PostDetail;
