import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { useImage } from '../../hooks/useImage';
import { useTag } from '../../hooks/useTag';
import { usePost } from '../../hooks/usePost';

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

export const PostWrite = () => {
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { images, selected, currentImageIndex, handlePrevImage, handleNextImage } = useImage();

  const { tags, handleAddTag, handleRemoveTag, error: tagError } = useTag();
  const { handlePrev } = usePost();

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // 내용 필수 입력 검증
      if (!description.trim()) {
        setError('내용을 입력해주세요.');
        return;
      }

      const selectedLocation = localStorage.getItem('selectedLocation');
      const locationData = selectedLocation ? JSON.parse(selectedLocation) : null;

      if (!locationData) {
        setError('위치를 선택해주세요.');
        return;
      }

      const formData = new FormData();

      // 이미지 추가
      selected.forEach((index, i) => {
        formData.append(`image${i + 1}`, images[index]);
      });

      // 게시물 데이터 추가
      formData.append(
        'postUpload',
        JSON.stringify({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          placeName: locationData.placeName,
          tags: tags.map((tag) => `#${tag}`),
          content: description,
          isPrivate: false,
        }),
      );

      const response = await axios.post<PostResponse>('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.isSuccess) {
        navigate('/');
      } else {
        if (response.data.code === 'VALID400_0') {
          // 위치 정보 관련 에러 처리
          if (
            response.data.result.latitude ||
            response.data.result.longitude ||
            response.data.result.placeName
          ) {
            setError('위치 정보를 입력해주세요.');
          }
          // 태그 관련 에러 처리
          else if (response.data.result.tagName) {
            setError(response.data.result.tagName);
          }
          // 내용 관련 에러 처리
          else if (response.data.result.content) {
            setError(response.data.result.content);
          }
          // 기타 유효성 검사 에러
          else {
            setError(response.data.message || '입력값이 올바르지 않습니다.');
          }
        } else {
          setError(response.data.message || '게시물 생성에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setError('게시물 생성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }, [images, selected, tags, description, navigate]);

  return (
    <div className="post-page min-h-screen flex flex-col">
      <header className="post-header flex items-center justify-between px-4 py-4">
        <ChevronLeft size={27} className="cursor-pointer" onClick={handlePrev} />
        <span className="title font-bold text-lg">새 게시물</span>
        <span className="w-8" />
      </header>
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="flex flex-col items-start px-2">
          <div className="w-full h-[40vh] mb-8 relative rounded-xl overflow-hidden">
            {selected.length > 0 ? (
              <>
                <img
                  src={URL.createObjectURL(images[selected[currentImageIndex]])}
                  alt="선택된 이미지"
                  className="w-full h-full object-cover"
                />
                {selected.length > 1 && (
                  <>
                    {currentImageIndex > 0 && (
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                      >
                        <ChevronLeft size={24} />
                      </button>
                    )}
                    {currentImageIndex < selected.length - 1 && (
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                      >
                        <ChevronRight size={24} />
                      </button>
                    )}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {selected.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">이미지를 선택해주세요</span>
              </div>
            )}
          </div>

          <div className="w-full flex items-center mb-8">
            <span
              className={`text-m font-bold flex items-center px-3 cursor-pointer text-left`}
              onClick={() => navigate('/location')}
            >
              {localStorage.getItem('selectedLocation')
                ? JSON.parse(localStorage.getItem('selectedLocation')!).placeName
                : '위치 추가'}
              <ChevronRight className="ml-1 cursor-pointer" />
            </span>
          </div>

          <div className={`w-full px-3 ${tags.length > 0 ? 'mb-5' : 'mb-3'}`}>
            <div className="flex flex-col">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    handleAddTag(e.currentTarget.value.trim());
                    setTagInput('');
                  }
                }}
                placeholder={tags.length < 5 ? '태그 추가...' : ''}
                className="text-sm outline-none mb-3"
                onFocus={(e) => {
                  e.preventDefault();
                  e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              />
              {tagError && (
                <div className="w-full text-red-500 text-xs mb-3 text-left">{tagError}</div>
              )}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded-xl flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-700">{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 설명 입력 영역 */}
          <div className="w-full px-3 mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="설명 추가..."
              className={`w-full outline-none text-sm resize-none px-0`}
              onFocus={(e) => {
                e.preventDefault();
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            />
          </div>

          {error && !error.includes('태그') && (
            <div className="px-3 text-red-500 text-sm text-left -mt-5">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-[100%] mx-auto mt-16 py-3 rounded-xl text-white font-semibold text-m shadow transition
              ${isSubmitting ? 'bg-blue-300' : 'bg-blue-400 active:bg-blue-500'}`}
          >
            {isSubmitting ? '게시 중...' : '게시'}
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
};
