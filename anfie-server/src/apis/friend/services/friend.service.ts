import { Injectable, NotFoundException } from '@nestjs/common';
import { FriendRepository } from '../repositories';
import { GetFriendsDto } from '../dto';

@Injectable()
export class FriendService {
	constructor(private readonly friendRepository: FriendRepository) {}

	async createOne(followeeId: string, followerId: string) {
		return this.friendRepository.createOne(followeeId, followerId);
	}
	async getFriends(userId: string, query: GetFriendsDto) {
		return this.friendRepository.getFriends(userId, query);
	}

	async findFriendById(id: string) {
		return this.friendRepository.findFriendById(id);
	}

	async deleteFriend(userId: string, friendId: string) {
		const isFriend = await this.friendRepository.isFriend(userId, friendId);
		if (!isFriend)
			throw new NotFoundException([
				{
					message: 'you are not friend with this user'
				}
			]);

		return this.friendRepository.deleteFriend(friendId);
	}

	async isFriend(firstUserId: string, secondUserId: string) {
		return this.friendRepository.isFriend(firstUserId, secondUserId);
	}

	async getFollowers(id: string) {
		return this.friendRepository.getFollowers(id);
	}

	async isAllFriends(userIds: string[]) {
		return this.friendRepository.areAllFriends(userIds);
	}
}
