// 게시물 타입 정의

export interface Post {
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

// 서버에서 '근처 가게 게시물' 받아오는 타입
export interface SimplePost {
  postImageUrl: string;
  postId: number;
  placeName: string;
  placeId: number;
}

// 전체 응답 타입
export interface NearbyPostsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    simplePost: SimplePost[];
  };
}

export interface Place {
  placeId: number; // 장소 ID
  name: string; // 장소 이름
  lat: number; // 위도
  lng: number; // 경도
}
