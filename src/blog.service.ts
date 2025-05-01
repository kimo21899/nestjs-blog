import { PostDto, Post } from './blog.model';

export class BlogService {
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  createPost(postDto: PostDto): Post {
    const id = (this.posts.length + 1).toString();
    const now = new Date();
    const newPost: Post = {
      id,
      ...postDto,
      createDt: now,
      updateDt: now,
    };
    this.posts.push(newPost);
    return newPost;
  }

  getPost(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

  updatePost(id: string, postDto: PostDto): Post | undefined {
    const post = this.posts.find((p) => p.id === id);
    if (post) {
      post.title = postDto.title;
      post.content = postDto.content;
      post.name = postDto.name;
      post.updateDt = new Date();
    }
    return post;
  }

  deletePost(id: string): boolean {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }

}
