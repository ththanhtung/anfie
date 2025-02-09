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
import { ConversationService } from 'src/apis/conversation/services';
import { Post } from 'src/apis/post/entities';

@Injectable()
export class ReportTicketService {
	constructor(
		private readonly reportTicketRepository: ReportTicketRepository,
		private readonly userService: UserService,
		private readonly messageService: MessageService,
		private readonly postService: PostService,
		private readonly commentService: CommentService,
		private readonly confessionService: ConfessionsService,
		private readonly conversationService: ConversationService
	) {}
	async createOne(user: TUserJwt, dto: CreateReportTicketDto) {
		if (
			Number(Boolean(dto.confessionId)) +
				Number(Boolean(dto.postId)) +
				Number(Boolean(dto.commentId)) +
				Number(Boolean(dto.conversationId)) +
				Number(Boolean(dto.messageIds)) !==
			1
		)
			throw new BadRequestException([
				{
					message: 'one and only one of [confessionId, postId, commentId, messageIds] should be provided'
				}
			]);

		let post: Post;
		if (dto.postId) {
			post = await this.postService.findOneById(user.userId.toString(), dto.postId);
			if (!post)
				throw new NotFoundException([
					{
						message: 'post not found'
					}
				]);

			const isReportExisted = await this.reportTicketRepository.isUserAlreadyReportPost(post.id.toString(), user.userId.toString());

			if (isReportExisted)
				throw new BadRequestException([
					{
						message: 'post already reported'
					}
				]);
		}

		if (dto.conversationId) {
			const conversation = await this.conversationService.findOneById(dto.confessionId);
			if (!conversation)
				throw new NotFoundException([
					{
						message: 'conversation not found'
					}
				]);

			const isReportExisted = await this.reportTicketRepository.isUserAlreadyReportConversation(
				conversation.id.toString(),
				user.userId.toString()
			);

			if (isReportExisted)
				throw new BadRequestException([
					{
						message: 'conversation already reported'
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

		const reportedUser = await this.userService.findOneById(dto.reporteeId, true);

		if (!reportedUser)
			throw new NotFoundException([
				{
					message: 'reportee user not found'
				}
			]);

		const reporterUser = await this.userService.findOneById(user.userId.toString(), true);

		if (!reporterUser)
			throw new NotFoundException([
				{
					message: 'reporter user not found'
				}
			]);

		if (dto.reporteeId === reporterId)
			throw new BadRequestException([
				{
					message: 'cannot sent report ticket for yourself'
				}
			]);

		const reporteeUser = await this.userService.findOneById(dto.reporteeId, true);
		if (!reporteeUser)
			throw new NotFoundException([
				{
					message: 'reportee user not found'
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
			conversationId: dto.conversationId,
			messages: messages,
			reporterId: reporterUser.profile.id,
			reporteeId: reporteeUser.profile.id,
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

		if (request.reporterId === userId)
			throw new BadRequestException([
				{
					message: 'cannot sent report ticket for yourself'
				}
			]);

		return this.reportTicketRepository.findOneAndDelete(requestId);
	}
}
