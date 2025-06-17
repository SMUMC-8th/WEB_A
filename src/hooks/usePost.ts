// API 요청 처리
// 게시물 생성 관련 에러 처리 및 유효성 검사

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Location } from '../types';
import api from '../apis/api';

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
  submitPost: (
    formData: FormData,
    onSuccess: () => void,
    onError: (error: string) => void,
  ) => Promise<void>;
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

  const submitPost = useCallback(
    async (formData: FormData, onSuccess: () => void, onError: (error: string) => void) => {
      try {
        const response = await api.post<PostResponse>('/api/posts', formData);

        if (response.data.isSuccess) {
          onSuccess();
          navigate('/map');
        } else {
          const serverError = validateServerResponse(response.data);
          if (serverError) {
            onError(serverError);
          }
        }
      } catch (error) {
        console.error('게시물 제출 실패:', error);
        if (axios.isAxiosError(error)) {
          console.error('서버 응답:', error.response?.data);
          if (error.response?.status === 401) {
            onError('로그인이 만료되었습니다. 다시 로그인해주세요.');
          } else {
            const errorData = error.response?.data as { message?: string };
            onError(errorData?.message || '게시물 제출에 실패했습니다. 다시 시도해주세요.');
          }
        }
      }
    },
    [validateServerResponse],
  );

  return {
    step,
    handleNext,
    handlePrev,
    validatePost,
    validateServerResponse,
    submitPost,
  };
};
