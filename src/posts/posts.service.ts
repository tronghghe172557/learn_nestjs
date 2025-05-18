import { Body, Injectable } from '@nestjs/common';
import { IPostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: IPostDto[] = [
    {
      id: 1,
      title: 'Post 1',
      content: 'Content of Post 1',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'Content of Post 2',
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'Content of Post 3',
    },
  ];

  async create(@Body() createPostDto: CreatePostDto) {
    const newPost = { id: this.posts.length + 1, ...createPostDto };
    this.posts.push(newPost);
    return 'This action adds a new post ' + JSON.stringify(createPostDto);
  }

  async findAll() {
    return `This action returns all posts ${JSON.stringify(this.posts)}`;
  }

  async findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      return `Post with id ${id} not found`;
    }
    return `This action returns a #${id} post`;
  }

  async update(id: number, @Body() updatePostDto: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      return `Post with id ${id} not found`;
    }
    this.posts[postIndex] = { ...this.posts[postIndex], ...updatePostDto };
    return `This action updates a #${id} post ${JSON.stringify(updatePostDto)}`;
  }

  async remove(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      return `Post with id ${id} not found`;
    }
    this.posts.splice(postIndex, 1);
    return `This action removes a #${id} post`;
  }
}
