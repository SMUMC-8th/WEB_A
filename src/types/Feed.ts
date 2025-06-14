// types/Post.ts

export interface FeedPost {
  nickname: string;
  profileUrl: string;
  postImageUrl: string[]; // 여러 이미지
  imageTotalCount: number;
  postId: number;
  placeId: number;
  likeCount: number;
  commentCount: number;
  placeName: string;
  content: string;
  tags: string[];
}

export interface PaginatedPostResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    post: FeedPost[];
    hasNext: boolean;
    pageSize: number;
    cursor: string;
  };
}
