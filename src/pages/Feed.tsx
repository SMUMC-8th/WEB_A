import { Ellipsis } from 'lucide-react';
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import Alert from '../components/popup/alert';
const posts = [
  {
    id: 1,
    imageUrl: 'https://www.studiopeople.kr/common/img/default_profile.png',
    username: '유진',
    likes: 128,
    caption: '🌸 오늘 날씨 너무 좋다!',
  },
  {
    id: 2,
    imageUrl: 'https://www.studiopeople.kr/common/img/default_profile.png',
    username: 'jyujin507',
    likes: 89,
    caption: '🧋카페에서 작업 중',
  },
  {
    id: 3,
    imageUrl: 'https://www.studiopeople.kr/common/img/default_profile.png',
    username: 'jyujin507',
    likes: 89,
    caption: '🧋카페에서 작업 중',
  },
  {
    id: 4,
    imageUrl: 'https://www.studiopeople.kr/common/img/default_profile.png',
    username: 'jyujin507',
    likes: 89,
    caption: '🧋카페에서 작업 중',
  },
  {
    id: 5,
    imageUrl: 'https://www.studiopeople.kr/common/img/default_profile.png',
    username: 'jyujin507',
    likes: 89,
    caption: '🧋카페에서 작업 중',
  },
  {
    id: 6,
    imageUrl: 'https://www.studiopeople.kr/common/img/default_profile.png',
    username: 'jyujin507',
    likes: 89,
    caption: '🧋카페에서 작업 중',
  },
  //더미 데이터임 무시하십쇼
];

const Feed = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="pt-[100px]">
      {posts.map((post) => (
        <div
          key={post.id}
          className="overflow-hidden shadow-md outline-gray-300
"
        >
          <div className="flex items-center p-3 bg-white">
            <img
              src="https://www.studiopeople.kr/common/img/default_profile.png"
              alt="Profile"
              className="rounded-full w-10 h-10 mr-2"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm">{post.username}</span>
              <span className="text-xs text-gray-500">청학동</span>
            </div>
            <div className="ml-auto cursor-pointer">
              <Ellipsis className="text-gray-500" onClick={() => setOpen(true)} />
            </div>
            <Alert open={open} onClose={() => setOpen(false)} />
          </div>
          <img src={post.imageUrl} alt="Post" className="w-full h-auto object-cover" />
          <div className="p-3">
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <Heart className="w-[20px] h-[20px]" />
                <span>{post.likes} Likes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-[20px] h-[20px]" />
                <span>120</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-[20px] h-[20px]" />
                <span>청학동</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{post.caption}</p>
            <p className="text-sm text-gray-500 mt-1">#청학동</p>
          </div>
        </div> //일단은 피드 나중에 컴포넌트로 빼기
      ))}
    </div>
  );
};

export default Feed;
