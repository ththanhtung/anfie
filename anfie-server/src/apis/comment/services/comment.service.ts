import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentRepository } from '../repositories';

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

			await this.commnentRepository.increaseCommentRight(postId, rightValue);
			await this.commnentRepository.increaseCommentLeft(postId, rightValue);
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

	async deleteComment(id: string) {
		return this.commnentRepository.delete(id);
	}
}
