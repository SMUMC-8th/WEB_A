// [Map.tsx]
// 사용자 현재 위치 기반 지도 + 게시물 마커 + 상세 모달
// 롱클릭 후 게시물 추가 구현 X

import { useState, useEffect, useRef } from 'react';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PostDetail from './PostDetail';
import { AnimatePresence } from 'framer-motion';
import { LocateFixed } from 'lucide-react';

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

  // 현재 따라가기 모드 ON/OFF 상태
  const [isFollowing, setIsFollowing] = useState(true);

  // mapRef로 카카오맵 인스턴스를 잡음
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // 사용자 위치 추적 -> 중심 위치 변경
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      // watchId : 추적을 멈출 때 쓸 ID
      (pos) => {
        //새 좌표 데이터
        const newLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setMyLocation(newLocation);

        // 지도 중심 이동
        if (isFollowing && mapRef.current) {
          const moveLatLon = new kakao.maps.LatLng(newLocation.lat, newLocation.lng);
          mapRef.current.panTo(moveLatLon);
        }
      },
      (error) => {
        console.error('위치 가져오기 실패:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0, // 이전 위치 캐시 안 씀 -> 항상 새로운 위치
        timeout: Infinity, // 시간 제한 없음
      },
    );
    // 언마운트 시 추적 종료
    return () => navigator.geolocation.clearWatch(watchId);
  }, [isFollowing]);

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

  // center 이동 함수 - 부드럽게 이동(panTo)
  const moveCenterSmooth = (lat: number, lng: number) => {
    if (mapRef.current) {
      const moveLatLon = new kakao.maps.LatLng(lat, lng);
      mapRef.current.panTo(moveLatLon);
    }
  };

  return (
    <div className="w-full h-screen">
      {myLocation && (
        <KakaoMap
          ref={mapRef}
          center={myLocation}
          level={zoomLevel}
          className="w-full h-full"
          style={{ minWidth: '100%', minHeight: '100%' }} // 축소 시 지도 축소 방지
          onDragStart={() => setIsFollowing(false)}
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
                  onClick={() => {
                    moveCenterSmooth(post.lat, post.lng); // 클릭 시 부드럽게 이동 & 상세 모달 열기
                    setSelectedPost(post);
                  }}
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
      {/* 내 위치로 돌아가기 버튼 */}
      <button
        onClick={() => {
          if (myLocation && mapRef.current) {
            mapRef.current.panTo(new kakao.maps.LatLng(myLocation.lat, myLocation.lng));
            setIsFollowing(true);
          }
        }}
        className=" absolute bottom-24 right-4 z-50 w-12 h-12 flex items-center justify-center
    bg-white/70 backdrop-blur-md border border-gray-300 rounded-full shadow-md hover:bg-white/90 transition"
      >
        <LocateFixed className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}

export default Map;
