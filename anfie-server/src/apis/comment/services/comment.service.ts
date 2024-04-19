import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRepository } from '../repositories';
import { DeleteCommentDto, GetCommentsDto } from '../dto';
import { PostService } from 'src/apis/post/services';
import { FriendService } from 'src/apis/friend/services';

@Injectable()
export class CommentService {
	constructor(
		private readonly commnentRepository: CommentRepository,
		private readonly postService: PostService,
		private readonly friendService: FriendService
	) {}
	async createComment(user: TUserJwt, dto: CreateCommentDto) {
		const { postId, content, parentId } = dto;
		const post = await this.postService.findOneById(user.userId.toString(), postId);
		if (!post) throw new NotFoundException([{ message: 'post not found' }]);

		let rightValue = 0;
		if (parentId) {
			const parentComment = await this.commnentRepository.findOneById(parentId);
			if (!parentComment) throw new NotFoundException([{ message: 'parent comment not found' }]);
			rightValue = parentComment.commentRight;
			await this.commnentRepository.increaseCommentRightBy2(postId, rightValue);
			await this.commnentRepository.increaseCommentLeftBy2(postId, rightValue);
		} else {
			const maxRightValue = await this.commnentRepository.findMaxRightValue(postId);
			if (maxRightValue) {
				rightValue = maxRightValue.commentRight + 1;
			} else {
				rightValue = 1;
			}
		}

		return this.commnentRepository.createOne({
			content,
			parentId,
			left: rightValue,
			right: rightValue + 1,
			userId: user.userId.toString(),
			postId
		});
	}

	async getCommentByParentId(parentId: string, query: GetCommentsDto) {
		return this.commnentRepository.findCommentsByParentId(parentId, query);
	}

	async deleteComment(id: string, dto: DeleteCommentDto) {
		const comment = await this.commnentRepository.findOneById(id);
		if (!comment) {
			throw new NotFoundException([
				{
					message: 'comment not found'
				}
			]);
		}

		const leftValue = comment.commentLeft;
		const rightValue = comment.commentRight;

		const width = rightValue - leftValue + 1;

		await this.commnentRepository.deleteBetween(dto.postId, leftValue, rightValue);

		await this.commnentRepository.decreaseCommentLeft(dto.postId, leftValue, width);
		await this.commnentRepository.decreaseCommentRight(dto.postId, rightValue, width);

		await this.commnentRepository.delete(id);

		return true;
	}

	async findOneById(userId: string, id: string) {
		const comment = await this.commnentRepository.findOneById(id);
		if (this.friendService.isFriend(comment.userId.toString(), userId))
			throw new BadRequestException([
				{
					message: 'you are not friend with the author of this post'
				}
			]);

		return comment;
	}
}
