import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Location {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface PostResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    postId?: number;
    placeId?: number;
    createdAt?: string;
    tagName?: string;
    latitude?: string;
    longitude?: string;
    placeName?: string;
    content?: string;
  };
}

interface UsePostReturn {
  step: number;
  handleNext: () => void;
  handlePrev: () => void;
  validatePost: (description: string, selectedLocation: Location | null) => string | null;
  validateServerResponse: (response: PostResponse) => string | null;
}

export const usePost = (): UsePostReturn => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    setStep((prev) => prev + 1);
    navigate('/post/write');
  }, [navigate]);

  const handlePrev = useCallback(() => {
    setStep((prev) => prev - 1);
    localStorage.removeItem('selectedLocation');
    navigate('/post');
  }, [navigate]);

  const validatePost = useCallback((description: string, selectedLocation: Location | null) => {
    if (!description.trim()) {
      return '내용을 입력해주세요.';
    }

    if (!selectedLocation) {
      return '위치를 선택해주세요.';
    }

    return null;
  }, []);

  const validateServerResponse = useCallback((response: PostResponse) => {
    if (response.isSuccess) {
      return null;
    }

    if (response.code === 'VALID400_0') {
      // 위치 정보 관련 에러 처리
      if (response.result.latitude || response.result.longitude || response.result.placeName) {
        return '위치 정보를 입력해주세요.';
      }
      // 태그 관련 에러 처리
      if (response.result.tagName) {
        return response.result.tagName;
      }
      // 내용 관련 에러 처리
      if (response.result.content) {
        return response.result.content;
      }
      // 기타 유효성 검사 에러
      return response.message || '입력값이 올바르지 않습니다.';
    }

    return response.message || '게시물 생성에 실패했습니다.';
  }, []);

  return {
    step,
    handleNext,
    handlePrev,
    validatePost,
    validateServerResponse,
  };
};
