import { Repository } from 'typeorm';
import { Friend } from '../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FriendRepository extends Repository<Friend> {
	constructor(@InjectRepository(Friend) repository: Repository<Friend>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getFriends(id: string): Promise<Friend[]> {
		return this.find({
			where: [{ followee: { id: +id } }, { follower: { id: +id } }]
		});
	}

	async getFollowers(id: string) {
		return this.find({
			where: { followee: { id: +id } }
		});
	}

	async isFriend(firstUserId: string, secondUserId: string) {
		return this.findOne({
			where: [
				{
					followee: { id: +firstUserId },
					follower: { id: +secondUserId }
				},
				{
					followee: { id: +secondUserId },
					follower: { id: +firstUserId }
				}
			]
		});
	}

	async findFriendById(id: string) {
		return this.findOne({
			where: {
				id: +id
			},
			relations: ['followee', 'follower']
		});
	}

	async deleteFriend(id: string) {
		return this.delete(id);
	}

	async createOne(followerId: string, followeeId: string) {
		return this.save({ followerId: +followerId, followeeId: +followeeId });
	}
}
