import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useKakaoLoader from '../hooks/useKakaoLoader'; // 경로는 프로젝트 구조에 맞게

interface Place {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function Location() {
  const navigate = useNavigate();
  const isKakaoLoaded = useKakaoLoader(); // ✅ 공통 훅 사용

  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [marker, setMarker] = useState<kakao.maps.Marker | null>(null);

  // 지도 초기화
  useEffect(() => {
    if (!isKakaoLoaded) return;

    const mapContainer = document.getElementById('map');
    if (!mapContainer) return; // map container가 없으면 리턴

    const mapOption: kakao.maps.MapOptions = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시청
      level: 3,
    };

    const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const moveLatLng = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        newMap.setCenter(moveLatLng);
      },
      (error) => {
        console.error('위치 가져오기 실패:', error);
      },
    );
  }, [isKakaoLoaded]);

  // 마커 생성 함수
  const createMarker = (place: Place) => {
    if (!isKakaoLoaded || !map) return;

    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      map: map,
    });
    setMarker(newMarker);

    const content = `
      <div style="
        padding: 15px;
        width: 250px;
        background: white;
        border-radius: 10px;
      ">
        <div style="
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        ">${place.placeName}</div>
        <div style="
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        ">${place.address}</div>
      </div>
    `;

    const newInfowindow = new window.kakao.maps.InfoWindow({
      content: content,
      removable: true,
      zIndex: 1,
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
      maxWidth: 300,
      pixelOffset: new window.kakao.maps.Point(0, -30),
      disableAutoPan: true,
    });
    newInfowindow.open(map, newMarker);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !isKakaoLoaded || !window.kakao?.maps?.services) {
      return;
    }

    try {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(
        query,
        (data: kakao.maps.services.PlacesSearchResult, status: kakao.maps.services.Status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const results: Place[] = data.map(
              (place: kakao.maps.services.PlacesSearchResultItem) => ({
                placeName: place.place_name,
                address: place.address_name,
                latitude: Number(place.y),
                longitude: Number(place.x),
              }),
            );
            setSearchResults(results);

            if (results.length > 0 && map) {
              const firstResult = results[0];
              setSelectedPlace(firstResult);
              const moveLatLng = new window.kakao.maps.LatLng(
                firstResult.latitude,
                firstResult.longitude,
              );
              map.setCenter(moveLatLng);
              map.setLevel(3);
              createMarker(firstResult);
            }
          }
        },
      );
    } catch (error) {
      console.error('장소 검색 중 오류 발생:', error);
    }
  };

  const handleSave = () => {
    if (selectedPlace) {
      localStorage.setItem('selectedLocation', JSON.stringify(selectedPlace));
      navigate('/post/write');
    } else if (query.trim()) {
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
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setSearchResults([]);
    setQuery(place.placeName);

    if (map && isKakaoLoaded) {
      const moveLatLng = new window.kakao.maps.LatLng(place.latitude, place.longitude);
      map.setCenter(moveLatLng);
      map.setLevel(3);
      createMarker(place);
    }
  };

  return (
    <div className="relative h-screen">
      <div id="map" className="w-full h-full" />

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
        <form onSubmit={handleSearch} className="relative">
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
        </form>

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
