import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRepository } from '../repositories';
import { DeleteCommentDto } from '../dto';

@Injectable()
export class CommentService {
	constructor(private readonly commnentRepository: CommentRepository) {}
	async createComment(user: TUserJwt, dto: CreateCommentDto) {
		const { postId, content, parentId } = dto;
		//TODO: check if post is exist

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

		return this.commnentRepository.createOne(content, parentId, rightValue, rightValue + 1, user.userId.toString(), postId);
	}

	async getCommentByParentId(parentId: string) {
		return this.commnentRepository.findCommentsByParentId(parentId, 'productId');
	}

	async deleteComment(id: string, dto: DeleteCommentDto) {
		const comment = await this.commnentRepository.findOneById(id);
		if (comment) {
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

		await this.commnentRepository.increaseCommentLeft(dto.postId, rightValue, -width);
		await this.commnentRepository.increaseCommentRight(dto.postId, rightValue, -width);

		await this.commnentRepository.delete(id);

		return true;
	}
}
