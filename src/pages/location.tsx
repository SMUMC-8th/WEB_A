import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  x: string;
  y: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  place_url: string;
  distance: string;
  category_group_code: string;
}

export const LocationPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  console.log('Kakao API Key:', KAKAO_API_KEY); // API 키 확인용 로그

  const fetchMapData = useCallback(async (searchQuery: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
        params: {
          query: searchQuery,
          radius: 1000,
        },
      });
      setResults(response.data.documents);
    } catch (error) {
      console.error('Error fetching map data:', error);

      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    (value: string) => {
      const timeoutId = setTimeout(() => {
        if (value) {
          fetchMapData(value);
        } else {
          setResults([]);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [fetchMapData],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleSelect = useCallback(
    (result: SearchResult) => {
      // 선택한 위치 정보를 로컬 스토리지에 저장
      localStorage.setItem(
        'selectedLocation',
        JSON.stringify({
          x: result.x,
          y: result.y,
          address: result.place_name,
        }),
      );
      // 이전 페이지로 돌아가기
      navigate(-1);
    },
    [navigate],
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-4 py-5 ">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft size={27} className="cursor-pointer" />
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg">
          위치 검색
        </h1>
        <div className="w-8" />
      </header>

      <div className="p-2">
        <input
          type="text"
          placeholder="장소를 검색하세요"
          value={query}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />

        {isLoading && <div className="mt-2 text-gray-500 text-sm">검색 중...</div>}

        <ul className="mt-4 space-y-2">
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleSelect(result)}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="font-medium">{result.place_name}</div>
              <div className="text-sm text-gray-500 mt-1">{result.address_name}</div>
              {result.road_address_name && (
                <div className="text-sm text-gray-500">{result.road_address_name}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
