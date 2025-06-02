import { useState, useRef } from 'react';

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
}

export const useImage = (): UseImageReturn => {
  const [images, setImages] = useState<File[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(files);
    setSelected(files.map((_, index) => index));
    setCurrentImageIndex(0);
  };

  const handleSelect = (idx: number) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter((i) => i !== idx));
    } else {
      setSelected([...selected, idx]);
    }
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < selected.length - 1 ? prev + 1 : prev));
  };

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
  };
};
