// 게시물 작성의 첫 번째 단계를 담당하는 컴포넌트
// ImageSelect와 ImageThumbnail 조합
// 선택된 이미지 상태 관리
// 다음 단계로 넘어가는 기능
// 전체적인 레이아웃과 스타일링 담당

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Navbar from '../Navbar';
import { useImage } from '../../hooks/useImage';
import { usePost } from '../../hooks/usePost';

export const PostSelect = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    images,
    selected,
    currentImageIndex,
    fileInputRef,
    handleImageUpload,
    handleSelect,
    handleAddImage,
  } = useImage();

  const { handleNext } = usePost();

  return (
    <div className="post-page flex flex-col h-screen">
      <header className="post-header flex items-center justify-between px-4 py-4">
        <ChevronLeft size={27} className="cursor-pointer" />
        <span className="font-bold text-lg">새 게시물</span>
        <button
          className="next-btn text-blue-500 font-bold cursor-pointer"
          onClick={handleNext}
          disabled={selected.length === 0}
        >
          다음
        </button>
      </header>

      <section className="image-preview h-[40vh] relative">
        {selected.length > 0 ? (
          <img
            src={URL.createObjectURL(images[selected[currentImageIndex]])}
            alt="선택된 이미지"
            className="w-full h-full object-cover"
            onLoad={(e) => {
              // 이미지 로드 완료 후 URL 해제
              URL.revokeObjectURL(e.currentTarget.src);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">이미지를 선택해주세요</span>
          </div>
        )}
      </section>

      {/* 최근 항목 모달 */}
      <section className="gallery-section flex-1 overflow-y-auto">
        <header className="gallery-header flex items-center justify-left px-4 py-4 relative">
          <span
            className="text-sm font-bold cursor-pointer select-none"
            onClick={() => setShowModal(!showModal)}
          >
            최근 항목
          </span>

          {showModal && (
            <div className="absolute left-2 top-full w-50 bg-gray-100 rounded-xl shadow z-10 text-sm font-sm border opacity-90 border-gray-200">
              <ul className="divide-y divide-gray-200">
                <li className="px-4 py-3 hover:bg-gray-100/60 cursor-pointer text-left">최근</li>
                <li className="px-4 py-3 hover:bg-gray-100/60 cursor-pointer text-left">동영상</li>
                <li className="px-4 py-3 hover:bg-gray-100/60 cursor-pointer text-left">
                  즐겨찾기
                </li>
                <li className="px-4 py-3 hover:bg-gray-100/60 cursor-pointer text-left">
                  모든 사진첩
                </li>
              </ul>
            </div>
          )}
          <ChevronRight />
        </header>

        <div className="grid grid-cols-3 gap-1 p-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <div
            className="relative cursor-pointer aspect-square bg-gray-100 flex items-center justify-center"
            onClick={handleAddImage}
          >
            <Plus size={24} className="text-gray-400" />
          </div>
          {images.map((image, idx) => {
            const isSelected = selected.includes(idx);
            const order = isSelected ? selected.indexOf(idx) + 1 : null;
            return (
              <div key={idx} className="relative cursor-pointer group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`썸네일${idx + 1}`}
                  className={`gallery-thumb w-full aspect-square object-cover ${
                    isSelected ? 'border-2 border-blue-500' : ''
                  }`}
                  onClick={() => handleSelect(idx)}
                  onLoad={(e) => {
                    // 이미지 로드 완료 후 URL 해제
                    URL.revokeObjectURL(e.currentTarget.src);
                  }}
                />
                {isSelected && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                    {order}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <Navbar />
    </div>
  );
};
