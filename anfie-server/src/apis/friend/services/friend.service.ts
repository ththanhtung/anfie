import { Injectable, NotFoundException } from '@nestjs/common';
import { FriendRepository } from '../repositories';
import { GetFriendsDto } from '../dto';
import { Users } from 'src/apis/user/entities';

@Injectable()
export class FriendService {
	constructor(private readonly friendRepository: FriendRepository) {}

	async createOne(followeeId: string, followerId: string) {
		return this.friendRepository.createOne(followeeId, followerId);
	}
	async getFriends(userId: string, query: GetFriendsDto) {
		const [friends, total] = await this.friendRepository.getFriends(userId, query);
		const myFriends: Users[] = [];
		for (const friend of friends) {
			if (friend.follower.id !== userId) myFriends.push(friend.follower);
			else if (friend.followee.id !== userId) myFriends.push(friend.followee);
		}
		return [myFriends, total];
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
