import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { PostService } from './services/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetPostsDto } from './dto';

@UseGuards(AtGuard)
@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	create(@GetCurrentUser('userId') authorId: number, @Body() createPostDto: CreatePostDto) {
		return this.postService.create(authorId, createPostDto);
	}

	@Get()
	findAll(@GetCurrentUser('userId') userId: string, @Query() query: GetPostsDto) {
		return this.postService.findAll(userId, query);
	}
}
