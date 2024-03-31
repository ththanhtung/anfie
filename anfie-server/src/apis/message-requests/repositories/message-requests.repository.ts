import { Repository } from 'typeorm';
import { MessageRequest } from '../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetMessageRequestsDto } from '../dto';
import { pagination } from 'src/common';

@Injectable()
export class MessageRequestRepository extends Repository<MessageRequest> {
	constructor(@InjectRepository(MessageRequest) repository: Repository<MessageRequest>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getMessageRequests(id: string, query: GetMessageRequestsDto) {
		const status = 'pending';

		return pagination(this, query, {
			where: [
				{
					sender: { id: +id },
					status
				},
				{
					receiver: { id: +id },
					status
				}
			],
			relations: ['sender', 'receiver']
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
					sender: { id: +firstUserId },
					receiver: { id: +secondUserId },
					status: 'pending'
				},
				{
					sender: { id: +secondUserId },
					receiver: { id: +firstUserId },
					status: 'pending'
				}
			]
		});
	}

	async createOne(senderId: string, receiverId: string, confestionId: string, content: string) {
		return this.save({
			senderId,
			receiverId,
			confestionId,
			content
		});
	}

	async accepted(id: string) {
		return this.save({ id: +id, status: 'accepted' });
	}

	async reject(id: string) {
		return this.save({ id: +id, status: 'rejected' });
	}
}
