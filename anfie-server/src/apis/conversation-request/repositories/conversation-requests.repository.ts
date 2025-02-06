import { Repository } from 'typeorm';
import { ConversationRequest } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { EXPIRATION_WINDOW_SECONDS, pagination } from 'src/common';
import { GetConversationRequestsAdminDto, GetConversationRequestsDto } from '../dto';

@Injectable()
export class ConversationRequestRepository extends Repository<ConversationRequest> {
	constructor(@InjectRepository(ConversationRequest) repository: Repository<ConversationRequest>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getConversationRequests(id: string, query: GetConversationRequestsDto) {
		const status = 'pending';

		return pagination(this, query, {
			where: [
				{
					firstUser: { id: id },
					status
				},
				{
					secondUser: { id: id },
					status
				}
			],
			relations: ['sender', 'receiver']
		});
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: id
			},
			relations: ['firstUser', 'secondUser']
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
					firstUser: { id: firstUserId },
					secondUser: { id: secondUserId },
					status: 'pending'
				},
				{
					firstUser: { id: secondUserId },
					secondUser: { id: firstUserId },
					status: 'pending'
				}
			]
		});
	}

	async createOne(firstUserId: string, secondUserId: string, matchedReason: string) {
		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

		const request = await this.save({
			firstUserId: firstUserId,
			secondUserId: secondUserId,
			expiratedAt: expiration,
			matchedReason
		});

		return this.findOne({
			where: {
				id: request.id
			},
			relations: ['firstUser', 'secondUser']
		});
	}

	async accepted(id: string) {
		return this.save({ id: id, status: 'accepted' });
	}

	async reject(id: string) {
		const request = await this.findOneById(id);
		return this.save({ ...request, status: 'rejected' });
	}

	async getConversationRequestsAdmin(query: GetConversationRequestsAdminDto) {
		const userId = query.userId ? query.userId : null;

		if (!userId) return pagination(this, query);

		return pagination(this, query, {
			where: [
				{
					firstUser: { id: userId }
				},
				{
					secondUser: { id: userId }
				}
			]
		});
	}

	async firstUserAccepted(id: string) {
		const request = await this.findOneById(id);
		request.isFirstUserAccepted = true;
		await this.save(request);
		return request;
	}

	async secondUserAccepted(id: string) {
		const request = await this.findOneById(id);
		request.isSecondUserAccepted = true;
		await this.save(request);
		return request;
	}

	async getConversationRequestBetweenTwoUsers(id1: string, id2: string) {
		return this.findOne({
			where: [
				{
					firstUserId: id1,
					secondUserId: id2
				},
				{
					firstUserId: id2,
					secondUserId: id1
				}
			]
		});
	}
}
