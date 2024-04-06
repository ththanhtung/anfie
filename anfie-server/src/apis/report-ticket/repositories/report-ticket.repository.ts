import { Repository } from 'typeorm';
import { ReportTicket } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common';
import { GetReportTicketsDto } from '../dto';

export class ReportTicketRepository extends Repository<ReportTicket> {
	constructor(@InjectRepository(ReportTicket) repository: Repository<ReportTicket>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(params: TCreateReportTicketParams) {
		return this.save(params);
	}

	async getReportTikets(query: GetReportTicketsDto) {
		const status = 'pending';

		return pagination(this, query, {
			where: { status },
			relations: ['modId', 'reporterId', 'reportedId']
		});
	}

	async getReportTiketsByUserId(userId: string, query: GetReportTicketsDto) {
		const status = 'pending';

		return pagination(this, query, {
			where: {
				reporter: { id: +userId },
				status
			},
			relations: ['modId', 'reporterId', 'reportedId']
		});
	}

	async findOneById(id: string) {
		return this.findOneById(id);
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
					reported: { id: +secondUserId },
					status: 'pending'
				},
				{
					reporter: { id: +secondUserId },
					reported: { id: +firstUserId },
					status: 'pending'
				}
			]
		});
	}

	async accepted(id: string, modId: string) {
		return this.save({ id: +id, status: 'accepted', modId });
	}

	async reject(id: string, modId: string) {
		return this.save({ id: +id, status: 'rejected', modId });
	}
}
