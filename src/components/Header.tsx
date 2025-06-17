import { useEffect, useState } from 'react';
import { Bell, Search, MapPin } from 'lucide-react';
import useKakaoLoader from '../hooks/useKakaoLoader'; // 공통 훅 사용

interface KakaoAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
}

interface KakaoGeocoderResult {
  address: KakaoAddress;
  road_address: null | {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
    x: string;
    y: string;
  };
}

export default function Header() {
  const [dongName, setDongName] = useState('로딩 중...');
  const isKakaoLoaded = useKakaoLoader(); // 공통 훅 사용

  useEffect(() => {
    if (!isKakaoLoaded) return; // 안전 guard

    if (!navigator.geolocation) {
      setDongName('위치 정보 지원 불가');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(
          longitude,
          latitude,
          (result: KakaoGeocoderResult[], status: string) => {
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
          },
        );
      },
      (error) => {
        console.error('위치 권한 오류:', error);
        setDongName('위치 권한 거부됨');
      },
    );
  }, [isKakaoLoaded]); // Kakao가 안전히 로드된 후 실행

  return (
    <header className="w-full pt-[60px] bg-white shadow fixed pb-2 z-50">
      <div className="flex justify-between px-[20px]">
        <div className="flex justify-center items-center gap-[10px]">
          <MapPin className="text-[#3273FF] font-bold" />
          <p className="text-xl font-bold text-[#3273FF]">{dongName}</p>
        </div>
        <div className="flex gap-[10px]">
          <Search className="text-gray-500" />
          <Bell className="text-gray-500" />
        </div>
      </div>
    </header>
  );
}
