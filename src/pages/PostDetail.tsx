// [PostDetail.tsx]
// 게시물 상세 모달 페이지

import { motion, useDragControls, PanInfo } from 'framer-motion';
import { MoreHorizontal, Heart, MessageCircle, Share, Bookmark, MapPinned } from 'lucide-react';
import { useEffect, useState } from 'react';
import PostOptionModal from '../components/alert/PostOptionModal';
import profileImg from '../img/profile.jpg';
import OpenChatConfirmModal from '../components/alert/OpenChatConfirmModal';
import { MapPost } from '../apis/Post';

// 부모 컴포넌트에서 전달받을 props 정의
interface Props {
  post: MapPost;
  onClose: () => void;
}

// 드래그 위치에 따른 모달 상태
type ModalState = 'closed' | 'mid' | 'full';

function PostDetail({ post, onClose }: Props) {
  const [showOptions, setShowOptions] = useState(false); // 점 세개 옵션 모달 상태
  const [modalState, setModalState] = useState<ModalState>('mid'); // 모달 상태 (초기값은 중간)
  const dragControls = useDragControls(); // 드래그 컨트롤러
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 오픈채팅 확인 모달 상태

  // 모달이 열릴 때 네브바 숨김
  useEffect(() => {
    const navbar = document.querySelector('nav') as HTMLElement | null;
    if (navbar) {
      navbar.classList.add('!hidden');
    }
    return () => {
      if (navbar) {
        navbar.classList.remove('!hidden');
      }
    };
  }, []);

  // 드래그 종료 시 y 위치에 따라 모달 상태 전환
  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    const y = info.point.y;

    if (y > window.innerHeight * 0.6) {
      setModalState('closed');
      onClose();
    } else if (y < window.innerHeight * 0.3) {
      setModalState('full');
    } else {
      setModalState('mid');
    }
  };

  const getModalY = () => {
    switch (modalState) {
      case 'full':
        return 0;
      case 'mid':
        return window.innerHeight * 0.2;
      case 'closed':
      default:
        return '100%';
    }
  };

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

  return (
    <>
      {/* 배경 오버레이 */}
      <motion.div
        className="fixed inset-0 bg-black/30 z-20"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* 상세 모달 본체 */}
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50 overflow-visible flex flex-col"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        initial={{ y: '100%' }}
        animate={{ y: getModalY() }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          height: getModalHeight(),
        }}
      >
        {/* 드래그 핸들 */}
        <div
          className="w-full h-6 flex justify-center items-center cursor-grab"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mt-2" />
        </div>

        {/* 상단 작성자 정보 + 점 버튼 */}
        <div className="flex items-center justify-between px-4 pt-2">
          <div className="flex items-center gap-3">
            <img
              src={profileImg}
              alt="profile"
              className="w-10 h-10 rounded-full bg-black object-cover"
            />
            <div className="flex flex-col items-start gap-1 text-left">
              <span className="text-base font-semibold">{post.author}</span>
              <span className="text-sm text-gray-500">{post.title}</span>
            </div>
          </div>

          <MoreHorizontal
            className="w-5 h-5 text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(true);
            }}
          />
          {showOptions && <PostOptionModal onClose={() => setShowOptions(false)} />}
        </div>

        {/* 게시물 이미지 */}
        <div className="relative w-full aspect-[3/4] bg-gray-100 mt-5">
          <img
            src={post.thumbnail || '/fallback.jpg'}
            alt={post.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* 댓글, 좋아요, 공유, 북마크 */}
        <div className="flex justify-between items-center px-4 py-3 text-base text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span>{post.commentCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </div>
            <a
              href={`https://map.kakao.com/link/map/${encodeURIComponent(post.title)},${post.lat},${
                post.lng
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <MapPinned className="w-5 h-5" />
              <span>{post.title}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Share className="w-5 h-5" />
            <Bookmark className="w-5 h-5" />
          </div>
        </div>

        {/* 설명 및 해시태그 */}
        <div className="px-4 pb-6 text-sm text-left mt-3">
          <div className="mb-1 w-full text-base text-gray-600 truncate">{post.description}</div>
          <div className="text-blue-600 font-semibold text-base break-words">
            #성신여대 #성신여대맛집 #김치볶음밥 #스테이크
          </div>
        </div>

        {/* 오픈채팅 버튼 */}
        <div className="flex justify-center mt-2">
          <button
            onClick={() => {
              if (post.openChatUrl) {
                setIsConfirmOpen(true);
              } else {
                window.open('https://open.kakao.com/', '_blank', 'noopener,noreferrer');
              }
            }}
            className="flex items-center gap-2 bg-white text-sm px-5 py-3 rounded-full shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <span className="text-gray-800 font-medium">
              {post.openChatUrl ? '오픈채팅방으로 이동' : '오픈채팅방 만들기'}
            </span>
          </button>

          {isConfirmOpen && post.openChatUrl && (
            <OpenChatConfirmModal
              placeName={post.title}
              openUrl={post.openChatUrl}
              onClose={() => setIsConfirmOpen(false)}
            />
          )}
        </div>
      </motion.div>
    </>
  );
}

export default PostDetail;
