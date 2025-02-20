import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostRepository } from '../repositories';
import { GetPostsDto } from '../dto';
import { FriendService } from 'src/apis/friend/services';
import { PostMediaService } from 'src/apis/post-media/services';
import { GetCommentsDto } from 'src/apis/comment/dto';
import { CommentService } from 'src/apis/comment/services';

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly friendsService: FriendService,
		private readonly postMediaService: PostMediaService,
		@Inject(forwardRef(() => CommentService))
		private readonly commentsService: CommentService
	) {}
	async create(authorId: string, createPostDto: CreatePostDto, medias: Express.Multer.File[]) {
		const post = await this.postRepository.createOne({ authorId, totalLikes: 0, ...createPostDto });
		this.postMediaService.create(post.id, medias);
		return post;
	}

	async findAll(userId: string, query: GetPostsDto) {
		const followers = await this.friendsService.getFollowers(userId);

		const followings = followers.map((item) => item.followee?.id);

		return this.postRepository.getPostsByUserIds(followings, query);
	}

	async findOneById(userId: string, id: string, isCheckingFriend: boolean = false) {
		const post = await this.postRepository.findOneById(id);
		if (!isCheckingFriend) return post;

		if (this.friendsService.isFriend(post.authorId.toString(), userId))
			throw new BadRequestException([
				{
					message: 'you are not friend with the author of this post'
				}
			]);

		return post;
	}

	async GetPostsByUserId(userId: string, query: GetPostsDto) {
		return this.postRepository.getPostsByUserId(userId, query);
	}

	async getPostsByGroupId(groupId: string, query: GetPostsDto) {
		return this.postRepository.getPostsByGroupId(groupId, query);
	}

	async getComments(id: string, query: GetCommentsDto) {
		return this.commentsService.getCommentsByPostId(id, query);
	}

	async deletePostById(id: string, userId: string) {
		return this.postRepository.deletePostById(id, userId);
	}
}
