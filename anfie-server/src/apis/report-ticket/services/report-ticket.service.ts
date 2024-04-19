import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportTicketDto } from '../dto/create-report-ticket.dto';
import { ReportTicketRepository } from '../repositories';
import { GetReportTicketsDto } from '../dto';
import { UserService } from 'src/apis/user/services';
import { MessageService } from 'src/apis/message/services';
import { PostService } from 'src/apis/post/services';
import { CommentService } from 'src/apis/comment/services';
import { ConfessionsService } from 'src/apis/confessions/services';
import { Message } from 'src/apis/message/entities';

@Injectable()
export class ReportTicketService {
	constructor(
		private readonly reportTicketRepository: ReportTicketRepository,
		private readonly userService: UserService,
		private readonly messageService: MessageService,
		private readonly postService: PostService,
		private readonly commentService: CommentService,
		private readonly confessionService: ConfessionsService
	) {}
	async createOne(user: TUserJwt, dto: CreateReportTicketDto) {
		if (
			Number(Boolean(dto.confessionId)) +
				Number(Boolean(dto.postId)) +
				Number(Boolean(dto.commentId)) +
				Number(Boolean(dto.messageIds)) !==
			1
		)
			throw new BadRequestException([
				{
					message: 'one and only one of [confessionId, postId, commentId, messageIds] should be provided'
				}
			]);

		if (dto.postId) {
			const post = await this.postService.findOneById(user.userId.toString(), dto.postId);
			if (!post)
				throw new NotFoundException([
					{
						message: 'post not found'
					}
				]);
		}

		if (dto.confessionId) {
			const confession = await this.confessionService.findOneById(dto.confessionId);
			if (!confession)
				throw new NotFoundException([
					{
						message: 'confession not found'
					}
				]);
		}

		if (dto.commentId) {
			const comment = await this.commentService.findOneById(user.userId.toString(), dto.commentId);
			if (!comment)
				throw new NotFoundException([
					{
						message: 'comment not found'
					}
				]);
		}

		const reporterId = user.userId.toString();
		const reportedUser = await this.userService.findOneById(+dto.reporteeId);
		if (!reportedUser)
			throw new NotFoundException([
				{
					message: 'reported user not found'
				}
			]);

		const isExisted = await this.reportTicketRepository.isPending(reporterId, dto.reporteeId);
		if (isExisted)
			throw new BadRequestException([
				{
					message: 'report ticket already exist'
				}
			]);

		if (dto.reporteeId === reporterId)
			throw new BadRequestException([
				{
					message: 'cannot sent report ticket for yourself'
				}
			]);

		let messages: Message[] = [];
		if (dto.messageIds) {
			messages = await this.messageService.getMessagesByIds(dto.messageIds);
		}

		return this.reportTicketRepository.createOne({
			postId: dto.postId,
			confessionId: dto.confessionId,
			commentId: dto.commentId,
			messages: messages,
			reporterId: reporterId,
			reporteeId: dto.reporteeId,
			content: dto.content,
			type: dto.type
		});
	}
	async getReportTikets(query: GetReportTicketsDto) {
		return this.reportTicketRepository.getReportTikets(query);
	}

	async getReportTiketsByUserId(user: TUserJwt, query: GetReportTicketsDto) {
		return this.reportTicketRepository.getReportTiketsByUserId(user.userId.toString(), query);
	}

	async cancelReportTicket(requestId: string, userId: string) {
		const request = await this.reportTicketRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'report ticket not found'
				}
			]);

		if (request.reporterId === +userId)
			throw new BadRequestException([
				{
					message: 'cannot sent report ticket for yourself'
				}
			]);

		return this.reportTicketRepository.findOneAndDelete(requestId);
	}
}
