// 선택된 이미지의 미리보기를 보여줌줌
// 이미지가 선택되지 않았을 때 빈 화면 표시
// 이미지 슬라이더 기능 제공 (prev, next 버튼)

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageThumbnailProps {
  images: string[];
  selected: number[];
  currentImageIndex: number;
  onPrevImage?: () => void;
  onNextImage?: () => void;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  images,
  selected,
  currentImageIndex,
  onPrevImage,
  onNextImage,
}) => {
  if (selected.length === 0) {
    return <div className="w-full h-full flex items-center justify-center bg-gray-100"></div>;
  }

  return (
    <div className="w-full h-[40vh] relative">
      <img
        src={images[selected[currentImageIndex]]}
        alt="선택된 이미지"
        className="w-full h-full object-cover"
      />
      {selected.length > 1 && (
        <>
          {currentImageIndex > 0 && onPrevImage && (
            <button
              onClick={onPrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {currentImageIndex < selected.length - 1 && onNextImage && (
            <button
              onClick={onNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <ChevronRight size={24} />
            </button>
          )}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {selected.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
