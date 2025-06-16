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
export interface ReplyComment {
  commentId: number;
  nickname: string;
  profileUrl: string;
  content: string;
  likeCount: number;
}

interface ReplyResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    comment: ReplyComment[];
    hasNext: boolean;
    pageSize: number;
    cursor: string;
  };
}

interface PostReplyResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    commentId: number;
    createdAt: string;
  };
}

export const fetchRepliesByCommentId = async (
  commentId: number,
  cursor: string = '-1',
  size: number = 10,
): Promise<ReplyComment[]> => {
  const response = await axiosInstance.get<ReplyResponse>(`/api/comments/${commentId}/replies`, {
    params: {
      cursor,
      size,
    },
  });

  if (response.data.isSuccess) {
    return response.data.result.comment || [];
  } else {
    console.error('대댓글 조회 실패:', response.data);
    throw new Error(response.data.message || '대댓글 조회 실패');
  }
};

export const postReplyByCommentId = async (
  commentId: number,
  content: string,
): Promise<PostReplyResponse> => {
  const response = await axiosInstance.post<PostReplyResponse>(
    `/api/comments/${commentId}/replies`,
    {
      content,
    },
  );

  if (response.data.isSuccess) {
    return response.data;
  } else {
    console.error('대댓글 작성 실패:', response.data);
    throw new Error(response.data.message || '대댓글 작성 실패');
  }
};

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
