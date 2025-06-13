// 이미지 관련 컨텍스트 제공
// 이미지 업로드, 선택, 이동, 초기화 등 관리

import React, { createContext, useContext, useRef, useCallback, useState } from 'react';
import { PostContextType, PostState, PostContent } from '../types';

const PostContext = createContext<PostContextType | null>(null);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PostState>({
    images: [],
    selected: [],
    currentImageIndex: 0,
    postContent: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 관리
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // 파일 유효성 검사
    const validFiles = files.filter((file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        console.error(`지원하지 않는 파일 형식입니다: ${file.name}`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        console.error(`파일 크기가 너무 큽니다: ${file.name}`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      return;
    }

    // 이미지 업로드 시 이미지 배열 업데이트
    setState((prev) => ({
      ...prev,
      images: validFiles,
      selected: validFiles.map((_, index) => index),
      currentImageIndex: 0,
    }));
  }, []);

  // 이미지 선택 인덱스 관리
  const handleSelect = useCallback((idx: number) => {
    setState((prev) => {
      const newSelected = prev.selected.includes(idx)
        ? prev.selected.filter((i) => i !== idx)
        : [...prev.selected, idx];

      return {
        ...prev,
        selected: newSelected,
        currentImageIndex: Math.min(prev.currentImageIndex, newSelected.length - 1),
      };
    });
  }, []);

  // 이미지 파일 선택 창 열림
  const handleAddImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 이전 이미지 이동
  const handlePrevImage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentImageIndex: Math.max(0, prev.currentImageIndex - 1),
    }));
  }, []);

  // 다음 이미지 이동
  const handleNextImage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentImageIndex: Math.min(prev.selected.length - 1, prev.currentImageIndex + 1),
    }));
  }, []);

  // 이미지 초기화
  const clearImages = useCallback(() => {
    setState((prev) => ({
      ...prev,
      images: [],
      selected: [],
      currentImageIndex: 0,
    }));
  }, []);

  // 게시물 내용 설정
  const setPostContent = useCallback((content: PostContent) => {
    setState((prev) => ({
      ...prev,
      postContent: content,
    }));
  }, []);

  // 게시물 내용 초기화
  const clearPostContent = useCallback(() => {
    setState((prev) => ({
      ...prev,
      postContent: null,
    }));
  }, []);

  const value = {
    ...state,
    fileInputRef,
    handleImageUpload,
    handleSelect,
    handleAddImage,
    handlePrevImage,
    handleNextImage,
    clearImages,
    setPostContent,
    clearPostContent,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  const context = useContext(PostContext);
  return context;
};
