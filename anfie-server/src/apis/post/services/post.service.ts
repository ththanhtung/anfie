import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
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

	async findAll(userId: string, query: GetPostsDto) {
		const followers = await this.friendsService.getFollowers(userId);

		const followings = followers.map((item) => item.followee.id);

		return this.postRepository.getPostsByUserIds(followings, query);
	}
}
