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
