import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendRequestDto } from '../dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from '../dto/update-friend-request.dto';
import { FriendRequestRepository } from '../repositories';

@Injectable()
export class FriendRequestService {
	constructor(private readonly friendRequestRepository: FriendRequestRepository) {}

	async getFriendRequests(user: TUserJwt) {
		return this.friendRequestRepository.getFriendRequests(user.userId.toString());
	}

	async cancelFriendRequest(requestId: string, userId: string) {
		const request = await this.friendRequestRepository.findOneById(userId);
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

		return this.friendRequestRepository.findOneAndDelete(requestId);
	}

	async createOne(senderId: string, receiverId: string) {
		const receiver = await this.friendRequestRepository.findOneById(receiverId);
		if (!receiver)
			throw new NotFoundException([
				{
					message: 'receiver not found'
				}
			]);
		const isExisted = this.friendRequestRepository.isPending(senderId, receiverId);

		if (isExisted)
			throw new BadRequestException([
				{
					message: 'friend request already exist'
				}
			]);

		if (senderId === receiverId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		return this.friendRequestRepository.createOne(senderId, receiverId);
	}

	async acceptFriendRequest(requestId: string, senderId: string) {
		const request = await this.friendRequestRepository.findOneById(requestId);
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

		if (request.receiverId === senderId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		await this.friendRequestRepository.accepted(requestId);
	}

	async rejectFriendRequest(requestId: string, senderId: string) {
		const request = await this.friendRequestRepository.findOneById(requestId);
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

		if (request.receiverId === senderId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		return this.friendRequestRepository.reject(requestId);
	}
}
