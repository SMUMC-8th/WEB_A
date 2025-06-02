import React, { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Map from './Map';

export default function Location() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(value);
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Map />
      </div>

      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <ChevronLeft size={27} className="cursor-pointer" onClick={() => navigate(-1)} />
          <span className="text-lg font-bold">위치 선택</span>
          <div className="w-8" />
        </div>
      </div>

      {/* Search Input Overlay */}
      <div className="absolute top-[80px] left-0 right-0 px-4 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="장소를 검색하세요"
            value={query}
            onChange={handleInputChange}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
