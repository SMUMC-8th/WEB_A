import { useState } from 'react';

interface UseTagReturn {
  tags: string[];
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
  error: string | null;
}

export const useTag = (): UseTagReturn => {
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddTag = (tag: string) => {
    // 태그 길이 검증
    if (tag.length > 6) {
      setError('각 태그는 6자 이하로 입력해야 합니다.');
      return;
    }

    // 태그 개수 검증
    if (tags.length >= 5) {
      setError('태그는 최대 5개까지 입력 가능합니다.');
      return;
    }

    // 중복 태그 검증
    if (tags.includes(tag)) {
      setError('이미 존재하는 태그입니다.');
      return;
    }

    setTags([...tags, tag]);
    setError(null);
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setError(null);
  };

  return {
    tags,
    handleAddTag,
    handleRemoveTag,
    error,
  };
};
