export interface PostDto {
  title: string;
  content: string;
  name: string;
}

// 게시글 전체 구조 (내부용)
export interface Post extends PostDto {
  id: string;
  createDt: Date;
  updateDt: Date;
}

// 파일용
export interface PostFileDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createDt: Date;
  updateDt?: Date;
}
