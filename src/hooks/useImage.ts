// 이미지 관련 인터페이스 관리

import { usePost } from '../contexts/PostContext';

export const useImage = () => {
  const context = usePost();

  if (!context) {
    throw new Error('useImage must be used within a PostProvider');
  }

  const {
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
  } = context;

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
