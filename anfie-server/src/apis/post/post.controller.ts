import { Controller, Get, Post, Body, UseGuards, Query, UseInterceptors, UploadedFiles, Param } from '@nestjs/common';
import { PostService } from './services/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetPostsDto } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetCommentsDto } from '../comment/dto';

@UseGuards(AtGuard)
@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	@UseInterceptors(FilesInterceptor('medias'))
	async create(
		@GetCurrentUser('userId') authorId: string,
		@Body() createPostDto: CreatePostDto,
		@UploadedFiles() medias: Express.Multer.File[]
	) {
		return this.postService.create(authorId, createPostDto, medias);
	}

	@Get()
	async findAll(@GetCurrentUser('userId') userId: string, @Query() query: GetPostsDto) {
		return this.postService.findAll(userId, query);
	}

	@Get('me')
	async getMyPosts(@GetCurrentUser('userId') userId: string, @Query() query: GetPostsDto) {
		return this.postService.GetPostsByUserId(userId, query);
	}

	@Get(':id')
	async findOneById(@GetCurrentUser('userId') userId: string, @Param('id') id: string) {
		return this.postService.findOneById(userId, id);
	}

	@Get(':id/comments')
	async getComments(@Param('id') id: string, @Query() query: GetCommentsDto) {
		return this.postService.getComments(id, query);
	}
}
