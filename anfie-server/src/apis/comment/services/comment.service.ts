import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRepository } from '../repositories';
import { DeleteCommentDto, GetCommentsDto } from '../dto';
import { PostService } from 'src/apis/post/services';

@Injectable()
export class CommentService {
	constructor(
		private readonly commnentRepository: CommentRepository,
		private readonly postService: PostService
	) {}
	async createComment(user: TUserJwt, dto: CreateCommentDto) {
		const { postId, content, parentId } = dto;
		const post = await this.postService.findOneById(postId);
		if (!post) throw new NotFoundException([{ message: 'post not found' }]);

		// return

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
		console.log({ query });
		console.log({ parentId });

		// return;
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
}
