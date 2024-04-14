import { Repository } from 'typeorm';
import { FriendRequest } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { GetFriendRequestsDto } from '../dto';
import { pagination } from 'src/common';

@Injectable()
export class FriendRequestRepository extends Repository<FriendRequest> {
	constructor(@InjectRepository(FriendRequest) repository: Repository<FriendRequest>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getFriendRequests(id: string, query: GetFriendRequestsDto) {
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

	async createOne(senderId: string, receiverId: string) {
		return this.save({
			senderId,
			receiverId
		});
	}

	async accepted(id: string) {
		return this.save({ id: +id, status: 'accepted' });
	}

	async reject(id: string) {
		return this.save({ id: +id, status: 'rejected' });
	}
}
