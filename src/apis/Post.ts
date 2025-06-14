// apis/Post.ts
import axiosInstance from './axios';

export interface Post {
  nickname: string;
  profileUrl: string;
  postImageUrl: string[];
  imageTotalCount: number;
  postId: number;
  placeId: number;
  likeCount: number;
  commentCount: number;
  placeName: string;
  content: string;
  tags: string[];
}

interface ApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    post: Post[];
    hasNext: boolean;
  };
}

export const fetchPostsByPlaceIds = async (
  placeIds: number[],
  size: number = 5,
): Promise<Post[]> => {
  const allPosts: Post[] = [];

  const requests = placeIds.map((placeId) =>
    axiosInstance.get<ApiResponse>(`/api/places/${placeId}/posts`, {
      params: { cursor: '-1', size },
    }),
  );

  const responses = await Promise.all(requests);

  for (const res of responses) {
    console.log('▶️ 응답 전체:', res.data);
    if (res.data.isSuccess) {
      const posts = res.data.result.post || [];
      console.log('✅ 해당 placeId에서 가져온 포스트:', posts.length);
      allPosts.push(...posts);
    } else {
      console.warn('❌ 실패 응답:', res.data);
    }
  }

  return allPosts;
};
