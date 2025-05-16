// [PostDetail.tsx]
// 카카오맵 위의 게시물 마커를 클릭했을 때, 화면 하단에서 슬라이드 업되는 상세 모달 컴포넌트.

// -- [Problem] -- //
// 현재는 모달이 스크롤과 함께 어느 정도 움직이지만,
// 드래그 제스처에 따라 전체화면/중간/닫기 상태를 명확히 전환하는 동작이 필요
// 화면 크기 및 콘텐츠 길이에 따른 반응형 대응도 필요

import { Post } from '../types/post';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import { MoreHorizontal, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import PostOptionModal from '../components/PostOptionModal';

interface Props {
  post: Post;
  onClose: () => void;
}

function PostDetail({ post, onClose }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.add('hidden');
    return () => {
      if (navbar) navbar.classList.remove('hidden');
    };
  }, []);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.point.y < window.innerHeight * 0.4) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* 오버레이 */}
      <motion.div
        className="fixed inset-0 bg-black/30 z-20"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* 게시물 상세 모달 */}
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50 overflow-hidden"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          height: isExpanded ? '90vh' : '80vh',
        }}
      >
        {/* 드래그 핸들러 표시 */}
        <div
          className="w-full h-6 flex justify-center items-center cursor-grab"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mt-2" />
        </div>

        {/* 상단 정보 */}
        <div className="flex items-center justify-between px-4 pt-2">
          <div className="flex items-center space-x-2">
            <img src="" alt="profile" className="w-10 h-10 rounded-full bg-black object-cover" />
            <div className="flex flex-col items-start justify-center h-full gap-1">
              <span className="text-sm font-semibold">{post.author}</span>
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
          {showOptions && <PostOptionModal onClose={() => setShowOptions(false)} />}
        </div>

        {/* 이미지 */}
        <img src={post.thumbnail} alt={post.title} className="aspect-square object-cover my-3" />

        {/* 아이콘 */}
        <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.commentCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Share className="w-4 h-4" />
            <Bookmark className="w-4 h-4" />
          </div>
        </div>

        {/* 설명 */}
        <div className="px-4 flex flex-col items-start text-sm text-gray-500">
          <div className="mb-1">{post.description}</div>
          <div>#일단태그</div>
        </div>
      </motion.div>
    </>
  );
}

export default PostDetail;
