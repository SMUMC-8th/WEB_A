// 게시물 객체 구조 정의

export interface Post {
  id: number; // 게시물 고유 ID
  title: string; // 게시물 제목
  description: string; // 게시물 본문
  lat: number; // 위도 (latitude) - 지도에 표시할 좌표
  lng: number; // 경도 (longitude) - 지도에 표시할 좌표
  thumbnail: string; // 지도에 표시할 썸네일 표시
  author: string; //작성자
  likes: number; // 좋아요 수
  commentCount: number; // 댓글 수
}
