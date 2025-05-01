import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('/blog')
export class BlogController {  
  // Service 변수 선언
  blogService: BlogService;
  
  // 생성자
  constructor() {
    this.blogService = new BlogService(); // 생성자에서 블로그 서비스 생성
  }

  // 포스트 목록
  @Get() 
  getAllPosts() {
    return this.blogService.getAllPosts();
  }

  // 포스트 등록
  @Post()
  createPost(@Body() postDto){
    console.log(postDto);
    this.blogService.createPost(postDto);
    return 'success';
  }

  // 포스트 내용보기
  @Get('/:id')
  getPost(@Param('id') id: string){
    console.log(`[id: ${id}] 게시물 가져오기`);
    return this.blogService.getPost(id);
  }
  
  // 포스트 삭제
  @Delete('/:id')
  deletePost(@Param('id') id: string){
    console.log(`[id: ${id}] 게시물 삭제하기`);
    this.blogService.deletePost(id);
    return 'success';
  }

  // 포스트 수정
  @Put('/:id') 
  updatePost(@Param('id') id: string, @Body() postDto){
    console.log(`[id: ${id}] 게시물 수정하기`);
    return this.blogService.updatePost(id, postDto);
  }

}