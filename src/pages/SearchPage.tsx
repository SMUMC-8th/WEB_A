// SearchPage.tsx
// 장소명 검색했을 때 나오는 화면
// 현재 윗부분만 구현

import { MapPin, MessageSquare } from 'lucide-react';
import { Post } from '../types/Post';

interface Props {
  post: Post;
  onClose: () => void;
}

const SearchPage = ({ post, onClose }: Props) => {
  return (
    <div className="px-4 py-6">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center">
        {/* 가게 이미지 + 이름 */}
        <div className="flex items-center gap-3">
          {/* 가게 사진 */}
          <img
            src={post.thumbnail || '/default-thumbnail.jpg'} // 썸네일 이미지
            alt={post.title}
            className="w-10 h-10 rounded-full object-cover"
          />
          {/* 장소명 */}
          <h2 className="text-xl font-semibold">{post.title}</h2>
        </div>

        {/* 버튼 2개 */}
        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
            <MapPin size={16} className="text-yellow-500" />
            카카오맵에서 보기
          </button>
          <button className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200">
            <MessageSquare size={16} className="text-blue-700" />
            오픈채팅방 입장
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
