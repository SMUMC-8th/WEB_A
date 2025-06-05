import { useState, useRef, useCallback, useEffect } from 'react';

interface UseImageReturn {
  images: File[];
  selected: number[];
  currentImageIndex: number;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (idx: number) => void;
  handleAddImage: () => void;
  handlePrevImage: () => void;
  handleNextImage: () => void;
  clearImages: () => void;
}

// 전역 상태로 이미지 관리
let globalImages: File[] = [];
let globalSelected: number[] = [];

export const useImage = (): UseImageReturn => {
  const [images, setImages] = useState<File[]>(globalImages);
  const [selected, setSelected] = useState<number[]>(globalSelected);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 전역 상태 변경 감지
  useEffect(() => {
    setImages(globalImages);
    setSelected(globalSelected);
  }, [globalImages, globalSelected]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    globalImages = files;
    globalSelected = files.map((_, index) => index);
    setImages(files);
    setSelected(files.map((_, index) => index));
    setCurrentImageIndex(0);
  }, []);

  const handleSelect = useCallback(
    (idx: number) => {
      if (selected.includes(idx)) {
        const newSelected = selected.filter((i) => i !== idx);
        globalSelected = newSelected;
        setSelected(newSelected);
      } else {
        const newSelected = [...selected, idx];
        globalSelected = newSelected;
        setSelected(newSelected);
      }
    },
    [selected],
  );

  const handleAddImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev < selected.length - 1 ? prev + 1 : prev));
  }, [selected.length]);

  const clearImages = useCallback(() => {
    globalImages = [];
    globalSelected = [];
    setImages([]);
    setSelected([]);
    setCurrentImageIndex(0);
    localStorage.removeItem('selectedLocation');
  }, []);

  return {
    images,
    selected,
    currentImageIndex,
    fileInputRef,
    handleImageUpload,
    handleSelect,
    handleAddImage,
    handlePrevImage,
    handleNextImage,
    clearImages,
  };
};
