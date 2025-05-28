import { Bell } from 'lucide-react';
import { Search } from 'lucide-react';
import { MapPin } from 'lucide-react';
export default function Header() {
  return (
    <header className="w-full mt-[60px] bg-white shadow fixed pb-2">
      <div className="flex justify-between px-[20px]">
        <div className="flex juestify-center items-center gap-[10px]">
          <MapPin className="text-[#3273FF] font-bold" />
          <p className="text-xl font-bold text-[#3273FF]">홍지동</p>{' '}
          {/* 바뀌는 값 : 장소 위치가 들어갈 예정*/}
        </div>
        <div className="flex gap-[10px]">
          <Search className="text-gray-500" />
          <Bell className="text-gray-500" />
        </div>
      </div>
    </header>
  );
}
