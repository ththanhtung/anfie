import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Comment } from '../entities';

@Injectable()
export class CommentRepository extends Repository<Comment> {
	constructor(@InjectRepository(Comment) repository: Repository<Comment>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: +id
			}
		});
	}

	async increaseCommentRightBy2(postId: string, rightValue: number) {
		return this.update(
			{
				postId: +postId,
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
				postId: +postId,
				commentRight: MoreThanOrEqual(rightValue)
			},
			{
				commentRight: () => 'comment_left + 2'
			}
		);
	}

	async findMaxRightValue(postId: string) {
		return this.findOne({
			where: {
				postId: +postId
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

	async createOne(content: string, parentId: string, left: number, right: number, userId: string, postId: string) {
		this.save({
			content,
			parentId: +parentId,
			commentLeft: left,
			commentRight: right,
			userId: +userId,
			postId: +postId
		});
	}

	async findCommentsByParentId(parentId: string, postId: string) {
		if (parentId) {
			const parent = await this.findOneById(parentId);
			if (!parent) throw new NotFoundException([{ message: 'parent comment not found' }]);
			return this.find({
				where: {
					postId: +postId,
					commentLeft: MoreThan(parent.commentRight),
					commentRight: LessThanOrEqual(parent.commentRight + 1)
				},
				order: {
					commentLeft: 'ASC'
				}
			});
		}
		return this.find({
			where: {
				postId: +postId
			},
			order: {
				commentLeft: 'ASC'
			}
		});
	}

	async findOneAndDelete(id: number) {
		return this.delete(id);
	}

	async deleteBetween(postId: string, leftValue: number, rightValue: number) {
		return this.delete({
			postId: +postId,
			commentLeft: Between(leftValue, rightValue)
		});
	}

	async increaseCommentLeft(postId: string, rightValue: number, amount: number) {
		return this.update(
			{
				postId: +postId,
				commentRight: MoreThanOrEqual(rightValue)
			},
			{
				commentRight: () => 'comment_left + ' + amount
			}
		);
	}

	async increaseCommentRight(postId: string, rightValue: number, amount: number) {
		return this.update(
			{
				postId: +postId,
				commentRight: MoreThanOrEqual(rightValue)
			},
			{
				commentRight: () => 'comment_right + ' + amount
			}
		);
	}
}
