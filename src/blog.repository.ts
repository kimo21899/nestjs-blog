import { readFile, writeFile} from "fs/promises";
import { PostFileDto } from "./blog.model";

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepository {
  getAllPost(): Promise<PostFileDto[]>,
  createPost(postFileDto: PostFileDto),
  getPost(id: String): Promise<PostFileDto>,
  deletePost(id: String),
  updatePost(id: String, postFileDto: PostFileDto);
}

// BlogRepository 인터페이스 구현 클래스
export class BlogFileRepository implements BlogRepository {
  // 데이터 저장용 json 파일 
  FILE_NAME='./src/blog.data.json';

  // 파일을 읽어서 목록을 조회
  async getAllPost(): Promise<PostFileDto[]> {
    const datas = await readFile(this.FILE_NAME, 'utf-8');
    const posts: PostFileDto[] = JSON.parse(datas); 
    return posts;
  }

  // 글쓰기
  async createPost(PostFileDto: PostFileDto) {
    const posts = await this.getAllPost();
    const id = posts.length+1;
    const createPost = {...PostFileDto,id: id.toString(), createDt: new Date(), updateDt: new Date() };
    posts.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }

  // 글 상세
  async getPost(id: String): Promise<PostFileDto> {
    const posts = await this.getAllPost();
    const filterPost: PostFileDto[] = posts.filter((post) => post.id===id);
    return filterPost[0];
  }

  // 글 삭제
  async deletePost(id: String) {
    const posts = await this.getAllPost();
    const filterPosts = posts.filter((post) => post.id!==id);
    await writeFile(this.FILE_NAME, JSON.stringify(filterPosts));
  }

  // 글 수정
  async updatePost(id: String, postFileDto: PostFileDto) {
    const posts = await this.getAllPost();
    const index = posts.findIndex((post) => post.id===id);
    // 예외처리
    if (index === -1) {
      throw new Error(`Post with id "${id}" not found.`);
    }

    const updatedPost: PostFileDto = {
      ...posts[index],         // 기존 정보 유지
      ...postFileDto,          // 수정된 정보 덮어씀
      updateDt: new Date(),    // 수정일 갱신
    };
  
    posts[index] = updatedPost;

    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }

}