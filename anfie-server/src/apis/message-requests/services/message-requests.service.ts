import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MessageRequestRepository } from '../repositories';
import { ConversationService } from 'src/apis/conversation/services';
import { GetMessageRequestsDto } from '../dto';

@Injectable()
export class MessageRequestsService {
	constructor(
		private readonly messageRequestRepository: MessageRequestRepository,
		private readonly conversationService: ConversationService
	) {}
	async createOne(senderId: string, receiverId: string) {
		const receiver = await this.messageRequestRepository.findOneById(receiverId);
		if (!receiver)
			throw new NotFoundException([
				{
					message: 'receiver not found'
				}
			]);
		const isExisted = this.messageRequestRepository.isPending(senderId, receiverId);

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

		return this.messageRequestRepository.createOne(senderId, receiverId, '', '');
	}
	async getMessageRequests(user: TUserJwt, query: GetMessageRequestsDto) {
		return this.messageRequestRepository.getMessageRequests(user.userId.toString(), query);
	}

	async cancelMessageRequest(requestId: string, userId: string) {
		const request = await this.messageRequestRepository.findOneById(userId);
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

		return this.messageRequestRepository.findOneAndDelete(requestId);
	}

	async acceptMessageRequest(requestId: string, senderId: string) {
		const request = await this.messageRequestRepository.findOneById(requestId);
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

		await this.messageRequestRepository.accepted(requestId);
		return this.conversationService.create(+senderId, { recipientId: +request.receiverId });
	}

	async rejectFriendRequest(requestId: string, senderId: string) {
		const request = await this.messageRequestRepository.findOneById(requestId);
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

		return this.messageRequestRepository.reject(requestId);
	}
}
