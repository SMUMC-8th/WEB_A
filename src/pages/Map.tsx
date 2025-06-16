// [Map.tsx]
// 사용자 현재 위치 기반 지도 + 게시물 마커 + 상세 모달
// 롱클릭 후 게시물 추가 구현 X

import { useState, useEffect } from 'react';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PostDetail from './PostDetail';
import { AnimatePresence } from 'framer-motion';

// 서버 데이터 타입, API & 변환 함수
import {
  Post,
  Place,
  MapPost,
  fetchPostsByPlaceIds, // placeId로 Post 리스트 가져오기
  fetchPlacesByIds, // placeId로 Place 리스트 가져오기
  mapPostToMapPost, // Post + Place → MapPost로 변환
} from '../apis/Post';

function Map() {
  // 현재 사용자 위치
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);

  // 지도에 표시할 모든 게시물 MapPost[]
  const [mapPosts, setMapPosts] = useState<MapPost[]>([]);

  // 사용자가 마커 클릭 시 선택된 게시물 - 모달에 넘김
  const [selectedPost, setSelectedPost] = useState<MapPost | null>(null);

  // 지도 확대/축소 레벨
  const [zoomLevel] = useState(4);

  // 사용자 현재 위치 가져오기
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

  // Post + Place join해서 mapPosts 채우기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Post[] 가져오기
        const posts: Post[] = await fetchPostsByPlaceIds([1, 2, 3]); // 테스트 placeId 배열

        // 2️. Post[]에서 placeId 뽑아서 중복 제거
        const placeIds = Array.from(new Set(posts.map((p) => p.placeId)));

        // 3️. Place[] 가져오기
        const places: Place[] = await fetchPlacesByIds(placeIds);

        // 4️. placeId → Place map
        const placeMap: Record<number, Place> = {};
        places.forEach((place) => {
          placeMap[place.placeId] = place;
        });

        // 5.Post + Place join → MapPost[]
        const mapPostList: MapPost[] = posts.map((post) => {
          const place = placeMap[post.placeId];
          return mapPostToMapPost(post, place.lat, place.lng);
        });

        setMapPosts(mapPostList);
      } catch (err) {
        console.error('데이터 가져오기 실패:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen">
      {myLocation && (
        <KakaoMap
          center={myLocation}
          level={zoomLevel}
          className="w-full h-full"
          style={{ minWidth: '100%', minHeight: '100%' }} // 축소 시 지도 축소 방지
        >
          {/* 좋아요 많은 순으로 마커 정렬 */}
          {[...mapPosts]
            .sort((a, b) => b.likes - a.likes) // 내림차순 정렬 - 좋아요 높은 게시물 배열 뒤쪽 -> 제일 위에 보임
            .map((post) => (
              <CustomOverlayMap
                key={post.id}
                position={{ lat: post.lat, lng: post.lng }}
                yAnchor={1}
              >
                <div
                  className="w-[60px] h-[80px] rounded-lg overflow-hidden border border-blue-600 shadow-lg cursor-pointer transition hover:scale-110"
                  onClick={() => setSelectedPost(post)} // MapPost 넘김 (id 포함)
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
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
