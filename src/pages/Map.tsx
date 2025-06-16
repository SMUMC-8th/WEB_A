import { useState, useEffect, useRef } from 'react';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PostDetail from './PostDetail';
import { AnimatePresence } from 'framer-motion';
import { LocateFixed } from 'lucide-react';

import { fetchNearbyPosts, MapPost } from '../apis/Post';

function Map() {
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapPosts, setMapPosts] = useState<MapPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<MapPost | null>(null);
  const [zoomLevel] = useState(4);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // 1️⃣ 내 위치 가져오기 → 최초 center 설정
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMyLocation(loc);
        setCenter((prev) => prev ?? loc); // 최초 1회만
      },
      (err) => console.error('위치 가져오기 실패:', err),
      { enableHighAccuracy: true },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 2️center 바뀌면 근처 게시물 불러오기
  useEffect(() => {
    if (!center) return;
    const fetch = async () => {
      try {
        const res = await fetchNearbyPosts(center.lat, center.lng);
        const simplePosts = res?.result?.simplePost ?? [];
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

      <button
        onClick={() => {
          if (myLocation && mapRef.current) {
            const moveLatLon = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);
            mapRef.current.panTo(moveLatLon);
            setCenter(myLocation);
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
