import { Repository } from 'typeorm';
import { ReportTicket } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common';
import { GetReportTicketsAdminDto, GetReportTicketsDto } from '../dto';

export class ReportTicketRepository extends Repository<ReportTicket> {
	constructor(@InjectRepository(ReportTicket) repository: Repository<ReportTicket>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(params: TCreateReportTicketParams) {
		return this.save({
			reporterId: +params.reporterId,
			reporteeId: +params.reporteeId,
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
				reporter: { id: +userId },
				...options
			},
			relations: ['mod', 'reporter', 'reportee']
		});
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: +id
			}
		});
	}

	async findOneAndDelete(id: string) {
		const request = await this.findOne({
			where: {
				id: +id
			}
		});
		this.delete({ id: +id });
		return request;
	}

	async isPending(firstUserId: string, secondUserId: string) {
		return this.findOne({
			where: [
				{
					reporter: { id: +firstUserId },
					reportee: { id: +secondUserId },
					status: 'pending'
				},
				{
					reporter: { id: +secondUserId },
					reportee: { id: +firstUserId },
					status: 'pending'
				}
			]
		});
	}

	async accepted(id: string, modId: string) {
		return this.save({ id: +id, status: 'accepted', modId: +modId });
	}

	async reject(id: string, modId: string) {
		return this.save({ id: +id, status: 'rejected', modId: +modId });
	}

	async getReportTicketsAdmin(query: GetReportTicketsAdminDto) {
		const options = {};
		if (query.status) {
			options['status'] = query.status;
		}
		return pagination(this, query, {
			where: options
		});
	}
}
