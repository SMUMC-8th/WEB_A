import { useState, useEffect, useRef } from 'react';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';

import PostDetail from './PostDetail';
import { AnimatePresence } from 'framer-motion';
import { LocateFixed } from 'lucide-react';
import { fetchNearbyPosts, MapPost } from '../apis/Post';

function Map() {
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapPosts, setMapPosts] = useState<MapPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<MapPost | null>(null);
  const [zoomLevel] = useState(4);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // 최초 위치 설정 - 상명대 서울 캠퍼스
  const DEFAULT_CENTER = { lat: 37.6027, lng: 126.9554 };
  const [center, setCenter] = useState<{ lat: number; lng: number }>(DEFAULT_CENTER);

  // 최초 1회: getCurrentPosition
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMyLocation(loc);
        setCenter(loc); // 최초 1회만 즉시 center 설정
      },
      (err) => {
        console.error('getCurrentPosition 실패:', err);
      },
      { enableHighAccuracy: true },
    );

    // 이후 추적: watchPosition
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMyLocation(loc);
        // 여기서는 center는 굳이 갱신 안 함 — 사용자가 직접 버튼으로 center 이동 가능
      },
      (err) => console.error('watchPosition 실패:', err),
      { enableHighAccuracy: true },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // center 바뀌면 근처 게시물 fetch
  useEffect(() => {
    if (!center) return;
    const fetch = async () => {
      try {
        const res = await fetchNearbyPosts(center.lat, center.lng);
        const simplePosts = res?.result?.simplePost ?? [];
        type SimplePost = {
          postId: number;
          placeId: number;
          placeName: string;
          postImageUrl: string;
        };
        const postList: MapPost[] = simplePosts.map((sp: SimplePost) => ({
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

        setMapPosts((prev) => {
          const merged = [...prev, ...postList];
          return merged.filter(
            (post, i, arr) => arr.findIndex((p) => p.postId === post.postId) === i,
          );
        });
      } catch (err) {
        console.error('근처 게시물 실패:', err);
      }
    };
    fetch();
  }, [center]);

  return (
    <div className="w-full h-screen">
      {center && (
        <KakaoMap
          ref={mapRef}
          center={center}
          level={zoomLevel}
          className="w-full h-full"
          style={{ minWidth: '100%', minHeight: '100%' }}
          onDragStart={() => {}}
          onCenterChanged={(map) => {
            const c = map.getCenter();
            setCenter({ lat: c.getLat(), lng: c.getLng() });
          }}
        >
          {[...mapPosts]
            .sort((a, b) => b.likeCount - a.likeCount)
            .map((post) => (
              <CustomOverlayMap
                zIndex={post.likeCount} // 좋아요 수 크에 따라 높게 설정
                key={post.postId}
                position={{ lat: post.lat, lng: post.lng }}
                yAnchor={1}
              >
                <div
                  className="w-[60px] h-[80px] rounded-lg overflow-hidden border border-blue-600 shadow-lg cursor-pointer transition hover:scale-110"
                  onClick={() => setSelectedPost(post)}
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

      {!selectedPost && (
        <button
          onClick={() => {
            if (myLocation) {
              setCenter(myLocation);
            }
          }}
          className="absolute bottom-24 right-4 z-50 w-12 h-12 flex items-center justify-center
      bg-white/70 backdrop-blur-md border border-gray-300 rounded-full shadow-md hover:bg-white/90 transition"
        >
          <LocateFixed className="w-6 h-6 text-black" />
        </button>
      )}
    </div>
  );
}

export default Map;
