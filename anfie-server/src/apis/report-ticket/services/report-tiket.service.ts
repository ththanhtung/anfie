import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportTicketDto } from '../dto/create-report-ticket.dto';
import { ReportTicketRepository } from '../repositories';
import { GetReportTicketsDto } from '../dto';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class ReportTicketService {
	constructor(
		private readonly reportTicketRepository: ReportTicketRepository,
		private readonly userService: UserService
	) {}
	async createOne(user: TUserJwt, dto: CreateReportTicketDto) {
		const reporterId = user.userId.toString();
		const reportedUser = await this.userService.findOneById(+dto.reportedId);
		if (!reportedUser)
			throw new NotFoundException([
				{
					message: 'reported user not found'
				}
			]);
		const isExisted = this.reportTicketRepository.isPending(reporterId, dto.reportedId);

		if (isExisted)
			throw new BadRequestException([
				{
					message: 'friend request already exist'
				}
			]);

		if (dto.reportedId === reporterId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		return this.reportTicketRepository.createOne({
			reporterId,
			...dto
		});
	}
	async getReportTikets(query: GetReportTicketsDto) {
		return this.reportTicketRepository.getReportTikets(query);
	}

	async getReportTiketsByUserId(user: TUserJwt, query: GetReportTicketsDto) {
		return this.reportTicketRepository.getReportTiketsByUserId(user.userId.toString(), query);
	}

	async cancelReportTicket(requestId: string, userId: string) {
		const request = await this.reportTicketRepository.findOneById(userId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'friend request not found'
				}
			]);

		if (request.senderId === userId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		return this.reportTicketRepository.findOneAndDelete(requestId);
	}

	async acceptReportTicket(requestId: string, modId: string) {
		const request = await this.reportTicketRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'friend request not found'
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
					message: 'friend request not found'
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
