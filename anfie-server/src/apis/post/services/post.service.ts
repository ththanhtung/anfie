import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostRepository } from '../repositories';
import { GetPostsDto } from '../dto';

@Injectable()
export class PostService {
	constructor(private readonly postRepository: PostRepository) {}
	async create(authorId: number, createPostDto: CreatePostDto) {
		return this.postRepository.createOne({ authorId, totalLikes: 0, ...createPostDto });
	}

	async findAll(query: GetPostsDto) {
		return this.postRepository.getAll(query);
	}

	findOne(id: number) {
		return `This action returns a #${id} post`;
	}

	update(id: number, updatePostDto: UpdatePostDto) {
		return `This action updates a #${id} post`;
	}

	remove(id: number) {
		return `This action removes a #${id} post`;
	}
}
