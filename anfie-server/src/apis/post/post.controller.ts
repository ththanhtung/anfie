import { Controller, Get, Post, Body, UseGuards, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostService } from './services/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetPostsDto } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseGuards(AtGuard)
@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	@UseInterceptors(FilesInterceptor('medias'))
	async create(
		@GetCurrentUser('userId') authorId: number,
		@Body() createPostDto: CreatePostDto,
		@UploadedFiles() medias: Express.Multer.File[]
	) {
		return this.postService.create(authorId, createPostDto, medias);
	}

	@Get()
	async findAll(@GetCurrentUser('userId') userId: string, @Query() query: GetPostsDto) {
		return this.postService.findAll(userId, query);
	}
}
