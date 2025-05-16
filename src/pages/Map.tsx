// [Map.tsx]
// 지도 기반 게시물 뷰 + 롱클릭 위치에 '게시물 추가'버튼 구현
// 게시물 추가 버튼은 일단 기능만 만들어둠.
// 게시물 목록은 현재 test용으로 하드코딩되어 있음.
// 상명대학교 위도,경도 = { lat: 37.60373, lng: 126.95755 }

// -- [Question] -- //
// Q1. 사용자 현재 위치를 기반으로 렌더링해야 하나요? 상명대학교 기준이면 달라질 것 같아서

// -- [Problem] -- //
// 1. 사용자가 클릭한 부분의 위도, 경도가 필요함.

import { useRef, useState, useEffect } from 'react';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Post } from '../types/post'; // 게시물 타입 정의
import PostDetail from './PostDetail'; // 상세 모달 컴포넌트
import { AnimatePresence } from 'framer-motion'; // 모달 애니메이션 처리용
import { useNavigate } from 'react-router-dom';

function Map() {
  // 카카오 지도 객체 상태 저장
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // 사용자의 현재 위치 상태
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);

  // 지도 줌 레벨 (고정값)
  const [zoomLevel] = useState(4);

  // 마커 클릭 시 표시할 게시물
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // 롱클릭한 위치의 좌표
  const [longTouchPosition, setLongTouchPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  // 롱클릭 타이머
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 페이지 이동 훅
  const navigate = useNavigate();

  // 사용자의 현 위치 요청
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setMyLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (error) => console.error('위치 가져오기 실패:', error),
    );
  }, []);

  // 롱클릭 - 마우스 기반
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('마우스 눌림', e.clientX, e.clientY); // 콘솔 확인용

    // 타이머 설정: 600ms 이상 누르면 롱클릭으로 판단
    timerRef.current = setTimeout(() => {
      if (!map) return;

      // 현재는 클릭 위치가 아닌, 지도 중심 위치를 좌표로 설정 (임시)
      const latlng = map.getCenter();

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
    console.log('터치 시작', e.touches[0].clientX, e.touches[0].clientY);

    timerRef.current = setTimeout(() => {
      if (!map) return;

      const latlng = map.getCenter(); // 추후 터치 좌표 변환할 수 있음 이거 그냥 임시로 설정
      console.log('모바일 롱클릭 위치:', latlng.getLat(), latlng.getLng()); // 콘솔 확인용 -> 이거 아직 안됨

      setLongTouchPosition({
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      });
    }, 600);

    console.log('(터치)타이머 설정됨!'); // 콘솔 확인용
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
      author: '제이',
      title: '성신여대 맛집',
      thumbnail: '/food.jpg',
      description: '맛있어요',
      likes: 12,
      commentCount: 5,
      lat: 37.592,
      lng: 127.016,
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
                className="w-[60px] h-[80px] rounded-lg overflow-hidden border border-white shadow-lg cursor-pointer transition hover:scale-110"
                onClick={() => setSelectedPost(post)}
              >
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              </div>
            </CustomOverlayMap>
          ))}

          {/* 롱클릭된 위치에 버튼 표시 */}
          {longTouchPosition && (
            <CustomOverlayMap position={longTouchPosition} yAnchor={1}>
              <button
                className="bg-white px-3 py-1 border shadow rounded text-sm"
                onClick={() => navigate('/post')} // 클릭 시 게시물 작성 페이지로 이동
              >
                게시물 추가
              </button>
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
