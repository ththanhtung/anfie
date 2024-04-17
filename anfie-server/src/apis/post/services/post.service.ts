import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostRepository } from '../repositories';
import { GetPostsDto } from '../dto';
import { FriendService } from 'src/apis/friend/services';
import { PostMediaService } from 'src/apis/post-media/services';

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly friendsService: FriendService,
		private readonly postMediaService: PostMediaService
	) {}
	async create(authorId: number, createPostDto: CreatePostDto, medias: Express.Multer.File[]) {
		const post = await this.postRepository.createOne({ authorId, totalLikes: 0, ...createPostDto });
		this.postMediaService.create(post.id, medias);
		return post;
	}

	async findAll(userId: string, query: GetPostsDto) {
		const followers = await this.friendsService.getFollowers(userId);

		const followings = followers.map((item) => item.followee.id);

		return this.postRepository.getPostsByUserIds(followings, query);
	}

	async findOneById(id: string) {
		return this.postRepository.findOneById(id);
	}
}
