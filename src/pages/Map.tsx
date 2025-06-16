// [Map.tsx]
// 사용자 현재 위치 기반 지도 + 근처 게시물 마커 + 상세 모달
// 롱클릭 후 게시물 추가는 X

import { useState, useEffect, useRef } from 'react';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PostDetail from './PostDetail';
import { AnimatePresence } from 'framer-motion';
import { LocateFixed } from 'lucide-react';

// API & 타입
import { MapPost, fetchNearbyPosts } from '../apis/Post';

function Map() {
  // 현재 사용자 위치
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  // 지도 중심 좌표 (드래그 시 변경됨)
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  // 지도에 표시할 모든 게시물 MapPost[]
  const [mapPosts, setMapPosts] = useState<MapPost[]>([]);
  // 사용자가 마커 클릭 시 선택된 게시물 (상세 모달에 넘김)
  const [selectedPost, setSelectedPost] = useState<MapPost | null>(null);
  // 지도 확대/축소 레벨
  const [zoomLevel] = useState(4);
  // 현재 따라가기 모드 ON/OFF 상태
  const [isFollowing, setIsFollowing] = useState(true);
  // mapRef로 카카오맵 인스턴스를 잡음
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // 사용자 현재 위치 추적 + 최초 center 지정
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newLoc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setMyLocation(newLoc);

        // 최초만 center 설정
        if (!center) setCenter(newLoc);

        // 따라가기 모드 ON이면 지도 이동
        if (isFollowing && mapRef.current) {
          mapRef.current.panTo(new kakao.maps.LatLng(newLoc.lat, newLoc.lng));
        }
      },
      (err) => console.error('위치 가져오기 실패:', err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: Infinity },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isFollowing, center]);

  useEffect(() => {
    if (!center) return;

    const fetchNearby = async () => {
      try {
        const response = await fetchNearbyPosts(center.lat, center.lng);

        const simplePosts: {
          postId: number;
          placeId: number;
          placeName: string;
          postImageUrl: string;
        }[] = response?.result?.simplePost ?? [];

        // SimplePost → MapPost 변환
        const postList: MapPost[] = simplePosts.map((sp) => ({
          postId: sp.postId,
          placeId: sp.placeId,
          placeName: sp.placeName,
          postImageUrl: [sp.postImageUrl],
          nickname: '',
          profileUrl: '',
          imageTotalCount: 1,
          likeCount: 0,
          commentCount: 0,
          content: '',
          tags: [],
          lat: center.lat,
          lng: center.lng,
        }));

        setMapPosts(postList);
      } catch (err) {
        console.error('근처 게시물 가져오기 실패:', err);
        setMapPosts([]);
      }
    };

    fetchNearby();
  }, [center]);

  // 중심 이동
  const moveCenterSmooth = (lat: number, lng: number) => {
    if (mapRef.current) {
      const moveLatLon = new kakao.maps.LatLng(lat, lng);
      mapRef.current.panTo(moveLatLon);
    }
  };

  return (
    <div className="w-full h-screen">
      {myLocation && center && (
        <KakaoMap
          ref={mapRef}
          center={isFollowing ? myLocation : center}
          level={zoomLevel}
          className="w-full h-full"
          style={{ minWidth: '100%', minHeight: '100%' }}
          onDragStart={() => setIsFollowing(false)}
          onCenterChanged={(map) => {
            const c = map.getCenter();
            setCenter({ lat: c.getLat(), lng: c.getLng() });
          }}
        >
          {/* 좋아요 많은 순으로 마커 정렬 */}
          {[...mapPosts]
            .sort((a, b) => b.likeCount - a.likeCount)
            .map((post) => (
              <CustomOverlayMap
                key={post.postId}
                position={{ lat: post.lat, lng: post.lng }}
                yAnchor={1}
              >
                <div
                  className="w-[60px] h-[80px] rounded-lg overflow-hidden border border-blue-600 shadow-lg cursor-pointer transition hover:scale-110"
                  onClick={() => {
                    moveCenterSmooth(post.lat, post.lng);
                    setSelectedPost(post);
                  }}
                >
                  <img
                    src={post.postImageUrl[0]}
                    alt={post.placeName}
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
            key={selectedPost.postId}
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
        className="absolute bottom-24 right-4 z-50 w-12 h-12 flex items-center justify-center
        bg-white/70 backdrop-blur-md border border-gray-300 rounded-full shadow-md hover:bg-white/90 transition"
      >
        <LocateFixed className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}

export default Map;
