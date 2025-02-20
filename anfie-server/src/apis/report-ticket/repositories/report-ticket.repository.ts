import { In, Repository } from 'typeorm';
import { ReportTicket } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common';
import { GetReportTicketsAdminDto, GetReportTicketsDto } from '../dto';
import { TCreateReportTicketParams } from 'src/common/@types/report-ticket';

export class ReportTicketRepository extends Repository<ReportTicket> {
	constructor(@InjectRepository(ReportTicket) repository: Repository<ReportTicket>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(params: TCreateReportTicketParams) {
		return this.save({
			postId: params.postId ? params.postId : null,
			confessionId: params.confessionId ? params.confessionId : null,
			conversationId: params.conversationId ? params.conversationId : null,
			commentId: params.commentId ? params.commentId : null,
			messages: params.messages,
			reporterId: params.reporterId ? params.reporterId : null,
			reporteeId: params.reporteeId ? params.reporteeId : null,
			content: params.content,
			type: params.type
		});
	}

	async getReportTikets(query: GetReportTicketsDto) {
		const status = 'pending';

		return pagination(this, query, {
			where: { status },
			relations: ['modId', 'reporterId', 'reportedId']
		});
	}

	async getReportTiketsByUserId(userId: string, query: GetReportTicketsDto) {
		const options = {};

		if (query.status) {
			options['status'] = query.status;
		}

		return pagination(this, query, {
			where: {
				reporter: { id: userId },
				...options
			},
			relations: ['mod', 'reporter', 'reportee']
		});
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: id
			}
		});
	}

	async findOneAndDelete(id: string) {
		const request = await this.findOne({
			where: {
				id: id
			}
		});
		this.delete({ id: id });
		return request;
	}

	async isPending(firstUserId: string, secondUserId: string) {
		return this.findOne({
			where: [
				{
					reporter: { id: firstUserId },
					reportee: { id: secondUserId },
					status: 'pending'
				},
				{
					reporter: { id: secondUserId },
					reportee: { id: firstUserId },
					status: 'pending'
				}
			]
		});
	}

	async accepted(id: string, modId: string) {
		return this.save({ id: id, status: 'accepted', modId: modId });
	}

	async reject(id: string, modId: string) {
		return this.save({ id: id, status: 'rejected', modId: modId });
	}

	async getReportTicketsAdmin(query: GetReportTicketsAdminDto) {
		const { status: statusString, reporteeEmail, reporterEmail, ticketId, postId } = query;

		const status = statusString ? JSON.parse(statusString) : [];

		return pagination(this, query, {
			relations: ['reporter', 'reportee', 'reporter.user', 'reportee.user'],
			where: {
				...(status.length > 0 && { status: In(status) }),
				...(reporteeEmail && {
					reportee: {
						user: { email: reporteeEmail }
					}
				}),
				...(reporterEmail && {
					reporter: {
						user: { email: reporterEmail }
					}
				}),
				...(ticketId && { id: ticketId }),
				...(postId && { postId: postId })
			}
		});
	}

	async getDetailTicketById(id: string) {
		return this.findOne({
			relations: [
				'reporter',
				'reportee',
				'reporter.user',
				'reportee.user',
				'confession',
				'post',
				'comment',
				'conversation',
				'post.author'
			],
			where: {
				id: id
			}
		});
	}

	async isUserAlreadyReportPost(postId: string, userId: string) {
		return this.findOne({
			where: {
				postId: postId,
				reporter: {
					userId
				}
			}
		});
	}

	async isUserAlreadyReportConversation(conversationId: string, userId: string) {
		return this.findOne({
			where: {
				conversationId: conversationId,
				reporter: {
					userId
				}
			}
		});
	}
}
