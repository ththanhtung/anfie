import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendRequestRepository } from '../repositories';
import { FriendService } from 'src/apis/friend/services/friend.service';
import { GetFriendRequestsAdminDto, GetFriendRequestsDto } from '../dto';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class FriendRequestService {
	constructor(
		private readonly friendRequestRepository: FriendRequestRepository,
		private readonly friendService: FriendService,
		private readonly userService: UserService
	) {}

	async getFriendRequests(user: TUserJwt, query: GetFriendRequestsDto) {
		return this.friendRequestRepository.getFriendRequests(user.userId.toString(), query);
	}

	async cancelFriendRequest(requestId: string, userId: string) {
		const request = await this.friendRequestRepository.findOneById(requestId);
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
		const receiver = await this.userService.findOneById(+receiverId);
		if (!receiver)
			throw new NotFoundException([
				{
					message: 'receiver not found'
				}
			]);

		const isExisted = await this.friendRequestRepository.isPending(senderId, receiverId);
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

		const updatedFriendRequest = await this.friendRequestRepository.accepted(requestId);
		const friend = await this.friendService.createOne(senderId, request.receiverId);

		return {
			friend,
			friendRequest: updatedFriendRequest
		};
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

	async getFriendRequestsAdmin(query: GetFriendRequestsAdminDto) {
		return this.friendRequestRepository.getFriendRequestsAdmin(query);
	}
}
