import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Comment } from '../entities';
import { GetCommentsDto } from '../dto';
import { pagination } from 'src/common';

@Injectable()
export class CommentRepository extends Repository<Comment> {
	constructor(@InjectRepository(Comment) repository: Repository<Comment>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: id
			}
		});
	}

	async increaseCommentRightBy2(postId: string, rightValue: number) {
		return this.update(
			{
				postId: postId,
				commentRight: MoreThanOrEqual(rightValue)
			},
			{
				commentRight: () => 'comment_right + 2'
			}
		);
	}
	async increaseCommentLeftBy2(postId: string, rightValue: number) {
		return this.update(
			{
				postId: postId,
				commentLeft: MoreThan(rightValue)
			},
			{
				commentLeft: () => 'comment_left + 2'
			}
		);
	}

	async findMaxRightValue(postId: string) {
		return this.findOne({
			where: {
				postId: postId
			},
			select: ['commentRight'],
			order: {
				commentRight: 'DESC'
			}
		});
	}

	async updateCommentLeftRight(id: number, commentLeft: number, commentRight: number) {
		return this.update(id, {
			commentLeft,
			commentRight
		});
	}

	async createOne({ content, parentId, left, right, userId, postId }: TCreateCommentParams) {
		console.log({ content, parentId, left, right, userId, postId });
		return this.save({
			content,
			parentId: parentId ? parentId : null,
			commentLeft: left,
			commentRight: right,
			userId: userId,
			postId: postId
		});
	}

	async findCommentsByParentId(parentId: string, query: GetCommentsDto) {
		if (parentId) {
			const parent = await this.findOneById(parentId);
			if (!parent) throw new NotFoundException([{ message: 'parent comment not found' }]);
			return pagination(this, query, {
				relations: ['user'],
				where: {
					postId: query.postId,
					commentLeft: MoreThan(parent.commentLeft),
					commentRight: LessThanOrEqual(parent.commentRight)
				}
			});
		}
		return pagination(this, query, {
			relations: ['user'],
			where: {
				postId: query.postId
			}
		});
	}
	async findOneAndDelete(id: string) {
		return this.delete(id);
	}

	async deleteBetween(postId: string, leftValue: number, rightValue: number) {
		return this.delete({
			postId: postId,
			commentLeft: Between(leftValue, rightValue)
		});
	}

	async decreaseCommentLeft(postId: string, leftValue: number, amount: number) {
		return this.update(
			{
				postId: postId,
				commentLeft: MoreThanOrEqual(leftValue)
			},
			{
				commentLeft: () => `comment_left - ${amount}`
			}
		);
	}

	async decreaseCommentRight(postId: string, rightValue: number, amount: number) {
		return this.update(
			{
				postId: postId,
				commentRight: MoreThanOrEqual(rightValue)
			},
			{
				commentRight: () => `comment_right - ${amount}`
			}
		);
	}

	async getComments(postId: string, query: GetCommentsDto) {
		return pagination(this, query, {
			relations: ['user'],
			where: {
				postId: postId
			}
		});
	}
}
