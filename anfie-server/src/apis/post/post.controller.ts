import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PostService } from './services/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
	findAll(@Query() query: GetPostsDto) {
		return this.postService.findAll(query);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(+id, updatePostDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postService.remove(+id);
	}
}
