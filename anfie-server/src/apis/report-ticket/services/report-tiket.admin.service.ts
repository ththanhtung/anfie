import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReportTicketRepository } from '../repositories';
import { GetReportTicketsAdminDto, GetReportTicketsDto } from '../dto';

@Injectable()
export class ReportTicketAdminService {
	constructor(private readonly reportTicketRepository: ReportTicketRepository) {}

	async getReportTikets(query: GetReportTicketsAdminDto) {
		return this.reportTicketRepository.getReportTicketsAdmin(query);
	}

	async getReportTiketsByUserId(user: TUserJwt, query: GetReportTicketsDto) {
		return this.reportTicketRepository.getReportTiketsByUserId(user.userId.toString(), query);
	}

	async acceptReportTicket(requestId: string, modId: string) {
		const request = await this.reportTicketRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'report ticket not found'
				}
			]);

		if (request.status === 'accepted')
			throw new BadRequestException([
				{
					message: 'request already accepted'
				}
			]);

		await this.reportTicketRepository.accepted(requestId, modId);
	}

	async rejectReportTicket(requestId: string, modId: string) {
		const request = await this.reportTicketRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'report ticket not found'
				}
			]);

		if (request.status === 'accepted')
			throw new BadRequestException([
				{
					message: 'request already accepted'
				}
			]);

		return this.reportTicketRepository.reject(requestId, modId);
	}
}
