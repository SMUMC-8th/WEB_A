// [Map.tsx]
// 사용자 현재 위치 기반 지도 + 게시물 마커 + 상세 모달 (롱클릭 기능 없음)

// -- 해야하는거 -- //
// 게시물에 올리면 위치정보 받아서 지도 위에 띄우기

import { useState, useEffect } from 'react';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PostDetail from './PostDetail';
import { AnimatePresence } from 'framer-motion';
import { Post } from '../types/Post';
import Food from '../assets/food.jpg';

function Map() {
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [zoomLevel] = useState(4);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        console.error('위치 가져오기 실패:', error);
      },
    );
  }, []);

  const dummyPosts: Post[] = [
    {
      id: 1,
      author: '제이/서제경',
      title: '성신여대 맛집',
      thumbnail: Food,
      description:
        '여기 정말 맛있어요 제가 가장 좋아하는 성신여대 맛집입니다. 진짜 체고체고 짱짱 어쩌고 저쩌고 냠냠',
      likes: 12,
      commentCount: 5,
      lat: 37.592,
      lng: 127.016,
      authorId: 1,
      openChatUrl: '',
    },
  ];

  return (
    <div className="w-full h-screen">
      {myLocation && (
        <KakaoMap
          center={myLocation}
          level={zoomLevel}
          className="w-full h-full"
          style={{ minWidth: '100%', minHeight: '100%' }} // 축소 시 지도 축소 방지
        >
          {dummyPosts.map((post) => (
            <CustomOverlayMap key={post.id} position={{ lat: post.lat, lng: post.lng }} yAnchor={1}>
              <div
                className="w-[60px] h-[80px] rounded-lg overflow-hidden border border-blue-600 shadow-lg cursor-pointer transition hover:scale-110"
                onClick={() => setSelectedPost(post)}
              >
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              </div>
            </CustomOverlayMap>
          ))}
        </KakaoMap>
      )}

      <AnimatePresence>
        {selectedPost && (
          <PostDetail
            key={selectedPost.id}
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Map;
