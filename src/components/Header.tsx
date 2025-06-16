import { useEffect, useState } from 'react';
import { Bell, Search, MapPin } from 'lucide-react';

export default function Header() {
  const [dongName, setDongName] = useState('로딩 중...');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const kakaoKey = import.meta.env.VITE_KAKAO_API;
    if (!kakaoKey) {
      console.error('Kakao API Key가 비어 있음');
      setDongName('API 키 누락');
      return;
    }

    const existingScript = document.querySelector(`script[src*="dapi.kakao.com"]`);
    if (existingScript) {
      loadKakaoMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = loadKakaoMap;
      document.head.appendChild(script);
    }

    function loadKakaoMap() {
      window.kakao.maps.load(() => {
        if (!navigator.geolocation) {
          setDongName('위치 정보 지원 불가');
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(longitude, latitude, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0]?.address;
                if (address?.region_3depth_name) {
                  setDongName(address.region_3depth_name);
                } else {
                  setDongName('주소 정보 없음');
                }
              } else {
                console.warn('역지오코딩 실패:', status);
                setDongName('주소 조회 실패');
              }
            });
          },
          (error) => {
            console.error('위치 권한 오류:', error);
            setDongName('위치 권한 거부됨');
          },
        );
      });
    }
  }, []);

  return (
    <header className="w-full pt-[60px] bg-white shadow fixed pb-2 z-50">
      <div className="flex justify-between px-[20px]">
        <div className="flex justify-center items-center gap-[10px]">
          <MapPin className="text-[#3273FF] font-bold" />
          <p className="text-xl font-bold text-[#3273FF]">{dongName}</p>
        </div>
        <div className="flex gap-[10px]">
          <Search
            className="text-gray-500 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
          <Bell className="text-gray-500" />
        </div>
      </div>

      {/* 검색창 */}
      {showSearch && (
        <div className="absolute top-[100px] left-0 w-full px-4 z-40">
          <div className="bg-white rounded-2xl shadow px-4 py-2 flex items-center max-w-xl mx-auto border border-gray-400">
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="장소명을 입력하세요"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}
