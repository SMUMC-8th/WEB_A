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

interface FeedResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    post: Post[];
    hasNext: boolean;
  };
}

export interface Comment {
  commentId: number;
  nickname: string;
  profileUrl: string;
  content: string;
  likeCount: number;
  replyCount: number;
}

interface CommentResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    comment: Comment[];
    hasNext: boolean;
    pageSize: number;
    cursor: string;
  };
}

export const fetchPostsByPlaceIds = async (
  placeIds: number[],
  size: number = 5,
): Promise<Post[]> => {
  const allPosts: Post[] = [];

  const requests = placeIds.map((placeId) =>
    axiosInstance.get<FeedResponse>(`/api/places/${placeId}/posts`, {
      params: { cursor: '-1', size },
    }),
  );

  const responses = await Promise.all(requests);

  for (const res of responses) {
    console.log('응답 전체:', res.data);
    if (res.data.isSuccess) {
      const posts = res.data.result.post || [];
      console.log('placeId에서 가져온 포스트:', posts.length);
      allPosts.push(...posts);
    } else {
      console.warn('실패 응답:', res.data);
    }
  }

  return allPosts;
};

export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await axiosInstance.get<CommentResponse>(`/api/posts/${postId}/comments`, {
    params: { cursor: '-1', size: 20 },
  });

  console.log('댓글 응답:', response.data);

  if (response.data.isSuccess) {
    return response.data.result.comment || [];
  } else {
    console.error('댓글 가져오기 실패:', response.data);
    throw new Error(response.data.message || '댓글 가져오기 실패');
  }
};

export const postCommentByPostId = async (postId: number, content: string) => {
  const response = await axiosInstance.post(`/api/posts/${postId}/comments`, {
    content,
  });

  if (response.data?.isSuccess === false) {
    throw new Error(response.data?.message || '댓글 작성 실패');
  }

  return response.data;
};

// 댓글 관련 API 함수
// 댓글 수정
export const editCommentById = async (commentId: number, newContent: string) => {
  const response = await axiosInstance.patch(`/api/comments/${commentId}`, {
    content: newContent,
  });

  if (!response.data?.isSuccess) {
    throw new Error(response.data?.message || '댓글 수정 실패');
  }

  return response.data;
};

// 댓글 삭제
export const deleteCommentById = async (commentId: number) => {
  const response = await axiosInstance.delete(`/api/comments/${commentId}`);

  if (!response.data?.isSuccess) {
    throw new Error(response.data?.message || '댓글 삭제 실패');
  }

  return response.data;
};

// 서버 응답 전용 Place 타입 - 위경도 포함
export interface Place {
  placeId: number;
  name: string;
  lat: number;
  lng: number;
}

// 클라이언트 지도 렌더링 전용 MapPost 타입
export interface MapPost {
  id: number;
  author: string;
  title: string;
  thumbnail: string;
  description: string;
  likes: number;
  commentCount: number;
  lat: number;
  lng: number;
  authorId: number;
  openChatUrl: string;
}

// Post → MapPost 변환 함수
// post, place 위경도 합쳐서 mappost 만듬
export const mapPostToMapPost = (post: Post, lat: number, lng: number): MapPost => ({
  id: post.postId,
  author: post.nickname,
  title: post.placeName,
  thumbnail: post.postImageUrl[0] ?? '',
  description: post.content,
  likes: post.likeCount,
  commentCount: post.commentCount,
  lat,
  lng,
  authorId: 0,
  openChatUrl: '',
});

// Post에 없는 장소 위경도를 보완해서 지도에 마커 찍게 해주는 보조 API!
//  - placeId에 연결된 Place 테이블에는 위경도가 들어있음
export const fetchPlacesByIds = async (placeIds: number[]): Promise<Place[]> => {
  const response = await axiosInstance.get<{ places: Place[] }>('/api/places', {
    params: { ids: placeIds.join(',') },
  });
  return response.data.places;
};

// 사용자 추천 안함
export const setNoRecommend = async (targetMemberId: number) => {
  const res = await fetch('/api/member/no-recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ targetMemberId }),
  });

  if (!res.ok) throw new Error('서버 오류');

  const data = await res.json();
  if (!data.isSuccess) throw new Error(data.message);

  return data.result;
};
