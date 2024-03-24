import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from '../dto/create-friend.dto';
import { UpdateFriendDto } from '../dto/update-friend.dto';
import { FriendRepository } from '../repositories';

@Injectable()
export class FriendService {
	constructor(private readonly friendRepository: FriendRepository) {}
	async getFriends(user: TUserJwt) {
		return this.friendRepository.getFriends(user.userId.toString());
	}

	async findFriendById(id: string) {
		return this.friendRepository.findFriendById(id);
	}

	async deleteFriend(id: string, friendId: string) {
		const friend = await this.findFriendById(id);
		if (!friend)
			throw new NotFoundException([
				{
					message: 'friend not found'
				}
			]);
		if (friend.followerId.toString() !== friendId && friend.followeeId.toString() !== friendId)
			throw new BadRequestException([
				{
					message: 'you are not friend with this user'
				}
			]);

		return this.friendRepository.deleteFriend(id);
	}

	async isFriend(firstUserId: string, secondUserId: string) {
		return this.friendRepository.isFriend(firstUserId, secondUserId);
	}
}
