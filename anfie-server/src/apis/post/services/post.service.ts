import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostRepository } from '../repositories';
import { GetPostsDto } from '../dto';
import { FriendService } from 'src/apis/friend/services';

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly friendsService: FriendService
	) {}
	async create(authorId: number, createPostDto: CreatePostDto) {
		return this.postRepository.createOne({ authorId, totalLikes: 0, ...createPostDto });
	}

	async findAll(query: GetPostsDto) {
		// const follows = await this.friendsService.getFollows();
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
