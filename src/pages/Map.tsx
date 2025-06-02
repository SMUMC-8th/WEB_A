// [Map.tsx]
// 지도 기반 게시물 뷰 + 롱클릭 위치에 '게시물 추가'버튼 구현
// 게시물 목록은 현재 test용으로 하드코딩되어 있음.

// 상명대학교 위도,경도 = { lat: 37.60373, lng: 126.95755 }

// -- [Problem] -- //
// 1. 사용자가 클릭한 부분의 위도, 경도가 필요함.

import { useRef, useState, useEffect } from 'react';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
// import { Post } from '../types/post'; // 게시물 타입 정의
import PostDetail from './PostDetail'; // 상세 모달 컴포넌트
import { AnimatePresence } from 'framer-motion'; // 모달 애니메이션 처리용
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';

function Map() {
  // 카카오 지도 객체 상태 저장
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // 사용자의 현재 위치 상태
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);

  // 지도 줌 레벨 (고정값)
  const [zoomLevel] = useState(4);

  // 마커 클릭 시 표시할 게시물
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const isPostModalOpen = selectedPost !== null;

  // 롱클릭한 위치의 좌표
  const [longTouchPosition, setLongTouchPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  // 롱클릭 타이머
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 페이지 이동 훅
  const navigate = useNavigate();

  // 사용자의 현재 위치 요청
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

  // 롱클릭 - 마우스 기반
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPostModalOpen) return; // 게시물 모달 열려있으면 롱클릭 무시
    console.log('마우스 눌림', e.clientX, e.clientY); // 콘솔 확인용

    const x = e.clientX;
    const y = e.clientY;

    // 타이머 설정: 600ms 이상 누르면 롱클릭으로 판단
    timerRef.current = setTimeout(() => {
      if (!map) return;

      const projection = map.getProjection() as unknown as {
        containerPointToLatLng: (point: kakao.maps.Point) => kakao.maps.LatLng;
      };

      const point = new kakao.maps.Point(x, y);

      const latlng = projection.containerPointToLatLng(point);

      // 롱클릭 위치로 저장
      setLongTouchPosition({
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      });

      console.log('롱클릭 위치:', latlng.getLat(), latlng.getLng()); // 콘솔 확인용
    }, 600);
  };

  // 롱클릭 - 터치 기반
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isPostModalOpen) return;

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    timerRef.current = setTimeout(() => {
      if (!map) return;

      // 1. projection 객체 얻기
      const projection = map.getProjection() as unknown as {
        containerPointToLatLng: (point: kakao.maps.Point) => kakao.maps.LatLng;
      };

      // 2. 터치 좌표를 Point로 변환
      const point = new kakao.maps.Point(x, y);

      // 3. Point → 위도/경도 변환
      const latlng = projection.containerPointToLatLng(point);

      // 4. 상태 저장
      setLongTouchPosition({
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      });

      console.log('모바일 롱클릭 위도/경도:', latlng.getLat(), latlng.getLng());
    }, 600);
  };

  // 롱클릭 취소 - 마우스, 터치 공용 사용
  const cancelLongClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      console.log('롱클릭 취소'); // 콘솔 확인용
    }
  };

  // test data
  const dummyPosts: Post[] = [
    {
      id: 1,
      author: '제이/서제경',
      title: '성신여대 맛집',
      thumbnail: '/food.jpg',
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
    <div
      className="w-full h-screen relative"
      onMouseDown={handleMouseDown} // 마우스 눌렀음
      onMouseUp={cancelLongClick} // 마우스 뗌
      onMouseLeave={cancelLongClick} // 마우스 영역 벗어남
      onTouchStart={handleTouchStart} // 터치 시작함
      onTouchEnd={cancelLongClick} // 터치 끝남
      onTouchMove={cancelLongClick} // 터치 영역 벗어남
    >
      {/* 현재 위치를 받아온 경우에만 지도 렌더링 */}
      {myLocation && (
        <KakaoMap center={myLocation} level={zoomLevel} className="w-full h-full" onCreate={setMap}>
          {/* 게시물 마커 */}
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

          {/* 롱클릭된 위치에 버튼 표시 */}
          {longTouchPosition && (
            <CustomOverlayMap position={longTouchPosition} yAnchor={1}>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => navigate('/post')}
                  className="bg-[#F9FAFB] text-[#111827] text-sm font-medium px-4 py-2 rounded-full shadow border border-blue-600 hover:bg-white hover:shadow-md transition"
                >
                  게시물 추가
                </button>
              </div>
            </CustomOverlayMap>
          )}
        </KakaoMap>
      )}

      {/* 게시물 상세 모달 */}
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
