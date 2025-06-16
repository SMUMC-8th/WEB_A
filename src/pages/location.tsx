import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Map as KakaoMap, CustomOverlayMap } from 'react-kakao-maps-sdk';

interface Place {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function Location() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);

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
        // 기본 위치 설정 (서울시청)
        setMyLocation({ lat: 37.5665, lng: 126.978 });
      },
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSave = () => {
    if (query.trim()) {
      console.log('검색어:', query.trim());
      localStorage.setItem(
        'selectedLocation',
        JSON.stringify({
          placeName: query.trim(),
          address: '',
          latitude: 0,
          longitude: 0,
        }),
      );

      navigate('/post/write');
    } else {
      console.log('검색어가 비어있음');
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setSearchResults([]);
    setQuery(place.placeName);

    // 선택한 장소로 지도 이동
    if (map) {
      const moveLatLng = new kakao.maps.LatLng(place.latitude, place.longitude);
      map.setCenter(moveLatLng);
      map.setLevel(3);
    }
  };

  return (
    <div className="relative h-screen">
      {myLocation && (
        <KakaoMap center={myLocation} level={3} className="w-full h-full" onCreate={setMap}>
          {selectedPlace && (
            <>
              <CustomOverlayMap
                position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
                yAnchor={1}
              >
                <div className="bg-white px-2 py-2 rounded-lg border border-blue-600">
                  <div className="font-medium">{selectedPlace.placeName}</div>
                  <div className="text-sm text-gray-500">{selectedPlace.address}</div>
                </div>
              </CustomOverlayMap>
            </>
          )}
        </KakaoMap>
      )}

      <div className="absolute top-0 left-0 right-0 z-10 bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          <ChevronLeft size={27} className="cursor-pointer" onClick={() => navigate(-1)} />
          <span className="text-lg font-bold">위치 선택</span>
          <button className="text-blue-500 font-bold" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>

      <div className="absolute top-[80px] left-0 right-0 px-4 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="장소를 검색하세요"
            value={query}
            onChange={handleInputChange}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 bg-white"
          />
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* 검색 결과 목록 */}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-white rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => handlePlaceSelect(result)}
              >
                <div className="font-medium">{result.placeName}</div>
                <div className="text-sm text-gray-500">{result.address}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
