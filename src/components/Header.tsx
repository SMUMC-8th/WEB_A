import { Bell } from 'lucide-react';
import { Search } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="w-full pt-[60px] bg-white shadow fixed pb-2 z-50">
      <div className="flex justify-between px-[20px]">
        <div className="flex juestify-center items-center gap-[10px]">
          <MapPin className="text-[#3273FF] font-bold" />
          <p className="text-xl font-bold text-[#3273FF]">홍지동</p>{' '}
          {/* 바뀌는 값 : 장소 위치가 들어갈 예정*/}
        </div>
        <div className="flex gap-[10px]">
          <Search
            className="text-gray-500 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)} // 다시 아이콘 누르면 검색창 닫힘
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
