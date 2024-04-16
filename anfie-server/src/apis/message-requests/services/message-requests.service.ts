import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MessageRequestRepository } from '../repositories';
import { ConversationAdminService } from 'src/apis/conversation/services';
import { CreateMessageRequestDto, GetMessageRequestsDto } from '../dto';
import { ConfessionsService } from 'src/apis/confessions/services';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class MessageRequestsService {
	constructor(
		private readonly messageRequestRepository: MessageRequestRepository,
		private readonly conversationAdminService: ConversationAdminService,
		private readonly confessionService: ConfessionsService,
		private readonly userService: UserService
	) {}
	async createOne(senderId: string, dto: CreateMessageRequestDto) {
		const confession = await this.confessionService.findOneById(dto.confessionId);

		const receiverId = confession.ownerId.toString();
		const receiver = await this.userService.findOneById(+receiverId);
		if (!receiver)
			throw new NotFoundException([
				{
					message: 'receiver not found'
				}
			]);
		const isExisted = await this.messageRequestRepository.isPending(senderId, receiverId);

		if (isExisted)
			throw new BadRequestException([
				{
					message: 'message request already exist'
				}
			]);

		if (senderId === receiverId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		return this.messageRequestRepository.createOne(senderId, receiverId, dto.confessionId, dto.content);
	}
	async getMessageRequests(user: TUserJwt, query: GetMessageRequestsDto) {
		return this.messageRequestRepository.getMessageRequests(user.userId.toString(), query);
	}

	async cancelMessageRequest(requestId: string, userId: string) {
		const request = await this.messageRequestRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'message request not found'
				}
			]);

		if (request.senderId === +userId)
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
					message: 'message request not found'
				}
			]);

		if (request.status === 'accepted')
			throw new BadRequestException([
				{
					message: 'request already accepted'
				}
			]);

		if (request.receiverId === +senderId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		await this.messageRequestRepository.accepted(requestId);
		return this.conversationAdminService.create({ user1: senderId, user2: request.receiverId.toString() });
	}

	async rejectFriendRequest(requestId: string, senderId: string) {
		const request = await this.messageRequestRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'message request not found'
				}
			]);

		if (request.status === 'accepted')
			throw new BadRequestException([
				{
					message: 'request already accepted'
				}
			]);

		if (request.receiverId === +senderId)
			throw new BadRequestException([
				{
					message: 'cannot sent friend request for yourself'
				}
			]);

		return this.messageRequestRepository.reject(requestId);
	}
}
