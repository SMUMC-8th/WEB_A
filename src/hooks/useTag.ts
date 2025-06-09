// 태그 관리
// 태그 관련 에러 및 유효성 검사

import { useState, useCallback } from 'react';

interface UseTagReturn {
  tags: string[];
  error: string | null;
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
}

export const useTag = (): UseTagReturn => {
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddTag = useCallback(
    (tag: string) => {
      // 한글인지 확인
      const isKorean = /^[가-힣]+$/.test(tag);
      if (!isKorean) {
        setError('태그는 한글만 입력 가능합니다.');
        return;
      }

      if (tags.length >= 5) {
        setError('태그는 최대 5개까지 추가할 수 있습니다.');
        return;
      }

      if (tags.includes(tag)) {
        setError('이미 추가된 태그입니다.');
        return;
      }

      setTags((prev) => [...prev, tag]);
      setError(null);
    },
    [tags],
  );

  const handleRemoveTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
    setError(null);
  }, []);

  return {
    tags,
    error,
    handleAddTag,
    handleRemoveTag,
  };
};
