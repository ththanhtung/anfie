import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendRequestRepository } from '../repositories';
import { FriendService } from 'src/apis/friend/services/friend.service';
import { GetFriendRequestsAdminDto, GetFriendRequestsDto } from '../dto';
import { UserService } from 'src/apis/user/services';
import { ConversationService } from 'src/apis/conversation/services';
import { FIFTEEN_MINUTES } from 'src/common';

@Injectable()
export class FriendRequestService {
	constructor(
		private readonly friendRequestRepository: FriendRequestRepository,
		private readonly friendService: FriendService,
		private readonly userService: UserService,
		private readonly conversationService: ConversationService
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

		if (request.senderId !== userId)
			throw new BadRequestException([
				{
					message: 'only sender can cancel friend request'
				}
			]);

		return this.friendRequestRepository.findOneAndDelete(requestId);
	}

	async createOne(senderId: string, receiverId: string) {
		// const conversation = await this.conversationService.findOneByUserIds(senderId, receiverId);
		// const conversationDuration = Date.now() - conversation.created_at.getTime();

		// if (conversationDuration <= FIFTEEN_MINUTES) {
		// 	throw new BadRequestException([
		// 		{
		// 			message: 'conversation must be at least 15 minutes'
		// 		}
		// 	]);
		// }

		const receiver = await this.userService.findOneById(receiverId);
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

	async acceptFriendRequest(requestId: string, userId: string) {
		const request = await this.friendRequestRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'friend request not found'
				}
			]);

		if (request.receiverId !== userId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		if (request.status === 'accepted')
			throw new BadRequestException([
				{
					message: 'request already accepted'
				}
			]);

		const conversation = await this.conversationService.findOneByUserIds(userId, request.senderId);

		if (!conversation) {
			throw new BadRequestException([
				{
					message: 'you and the the receiver must have a conversation'
				}
			]);
		}

		console.log({ conversation });

		const updatedFriendRequest = await this.friendRequestRepository.accepted(requestId);
		const friend = await this.friendService.createOne(userId, request.senderId);
		console.log({ userId, receiverId: request.senderId });

		await this.conversationService.toggleConversationMode(conversation.id);

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
