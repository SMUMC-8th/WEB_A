// components/Feed.tsx
import { useQuery } from '@tanstack/react-query';
import { fetchPostsByPlaceIds, Post } from '../apis/Post';
import { Ellipsis, Heart, MessageCircle, MapPin } from 'lucide-react';
import CommentModal from '../components/popup/CommentModal';
import PostOptionsModal from '../components/popup/PostOptionsMoadl';
import { useState } from 'react';

const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostOptionsOpen, setIsPostOptionsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const placeIds = [1];

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['postsByPlaces', placeIds],
    queryFn: () => fetchPostsByPlaceIds(placeIds),
    enabled: placeIds.length > 0,
  });

  const handleOpenComments = (postId: number) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };

  const handleCloseComments = () => setIsModalOpen(false);
  const handleOpenOptions = () => setIsPostOptionsOpen(true);
  const handleCloseOptions = () => setIsPostOptionsOpen(false);

  if (isLoading) return <div className="pt-[100px]">로딩 중...</div>;
  if (error) return <div className="pt-[100px]">에러가 발생했습니다</div>;

  console.log('posts', posts);

  if (!posts || posts.length === 0) {
    return <div className="pt-[100px] text-center text-gray-500">게시글이 없습니다.</div>;
  }

  return (
    <div className="pt-[100px] space-y-4">
      {posts.map((post: Post) => (
        <div
          key={post.postId}
          className="overflow-hidden shadow-md outline outline-1 outline-gray-200 rounded-md bg-white"
        >
          <div className="flex items-center p-3">
            <img
              src={post.profileUrl || 'https://www.studiopeople.kr/common/img/default_profile.png'}
              alt="Profile"
              className="rounded-full w-10 h-10 mr-2"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm">{post.nickname}</span>
              <span className="text-xs text-gray-500">{post.placeName}</span>
            </div>
            <div className="ml-auto cursor-pointer" onClick={handleOpenOptions}>
              <Ellipsis className="text-gray-500" />
            </div>
          </div>

          {/* 이미지 또는 이미지 없음 텍스트 */}
          {post.postImageUrl.length > 0 ? (
            <img src={post.postImageUrl[0]} alt="Post" className="w-full h-auto object-cover" />
          ) : (
            <div className="w-full h-[200px] bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
              이미지 없음
            </div>
          )}

          <div className="p-3">
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <Heart className="w-[20px] h-[20px]" />
                <span>{post.likeCount}</span>
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleOpenComments(post.postId)}
              >
                <MessageCircle className="w-[20px] h-[20px]" />
                <span>{post.commentCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-[20px] h-[20px]" />
                <span>{post.placeName}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{post.content}</p>
          </div>
        </div>
      ))}

      <CommentModal
        isOpen={isModalOpen}
        onClose={handleCloseComments}
        postId={selectedPostId ?? 1}
      />
      <PostOptionsModal isOpen={isPostOptionsOpen} onClose={handleCloseOptions} />
    </div>
  );
};

export default Feed;
