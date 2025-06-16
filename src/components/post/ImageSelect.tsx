// 파일 선택 버튼과 파일 입력 필드
// 사용자가 이미지 파일을 선택할 수 있는 부분분
// 선택된 이미지 파일을 부모 컴포넌트로 전달

import React from 'react';
import { Plus } from 'lucide-react';

interface ImageSelectProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (idx: number) => void;
  onAddImage: () => void;
}

export const ImageSelect: React.FC<ImageSelectProps> = ({
  fileInputRef,
  onImageUpload,
  onAddImage,
}) => {
  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      <div
        className="relative aspect-square cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50"
        onClick={onAddImage}
      >
        <Plus size={24} className="text-gray-400" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};
