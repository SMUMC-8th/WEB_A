// src/hooks/useKakaoLoader.ts
import { useEffect, useState } from 'react';

export default function useKakaoLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 이미 로드됐으면 바로 OK
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
      return;
    }

    // 이미 script 있으면 onload만 대기
    const existingScript = document.getElementById('kakao-map-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        window.kakao.maps.load(() => {
          setIsLoaded(true);
        });
      });
      return;
    }

    // 새로 script 삽입
    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_API
    }&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };
    document.head.appendChild(script);
  }, []);

  return isLoaded;
}
