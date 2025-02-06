import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConversationRequestRepository } from '../repositories';
import { UserProfileService, UserService } from 'src/apis/user/services';
import { GetConversationRequestsDto } from '../dto';

@Injectable()
export class ConversationRequestService {
	constructor(
		private readonly conversationRequestRepository: ConversationRequestRepository,
		private readonly userService: UserService,
		private readonly userProfileService: UserProfileService
	) {}

	async getConversationRequests(userId: string, query: GetConversationRequestsDto) {
		return this.conversationRequestRepository.getConversationRequests(userId, query);
	}

	async cancelConversationRequest(requestId: string) {
		const request = await this.conversationRequestRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'conversation request not found'
				}
			]);

		return this.conversationRequestRepository.findOneAndDelete(requestId);
	}

	async createOne(firstUserId: string, secondUserId: string, matchedReason: string) {
		const firstUser = await this.userService.findOneById(firstUserId);
		if (!firstUser)
			throw new NotFoundException([
				{
					message: 'first user not found'
				}
			]);

		const secondUser = await this.userService.findOneById(secondUserId);
		if (!secondUser)
			throw new NotFoundException([
				{
					message: 'second user not found'
				}
			]);

		const isExisted = await this.conversationRequestRepository.isPending(firstUserId, secondUserId);
		if (isExisted)
			throw new BadRequestException([
				{
					message: 'conversation request already exist'
				}
			]);

		if (firstUserId === secondUserId)
			throw new BadRequestException([
				{
					message: 'cannot sent conversation request for yourself'
				}
			]);

		const request = await this.conversationRequestRepository.createOne(firstUserId, secondUserId, matchedReason);

		const firstUserProfile = await this.userProfileService.getProfileByUserId(firstUserId);
		const secondUserProfile = await this.userProfileService.getProfileByUserId(secondUserId);

		return { ...request, firstUserProfile, secondUserProfile };
	}

	async acceptConversationRequest(requestId: string, userId: string) {
		let request = await this.conversationRequestRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'conversation request not found'
				}
			]);

		if (request.status === 'accepted')
			throw new BadRequestException([
				{
					message: 'request already accepted'
				}
			]);

		if (request.firstUserId === request.secondUserId)
			throw new BadRequestException([
				{
					message: 'cannot sent conversation request for yourself'
				}
			]);

		if (Date.now() - request.expiratedAt.getTime() > 0) {
			await this.conversationRequestRepository.reject(requestId);
			throw new BadRequestException([
				{
					message: 'request expired'
				}
			]);
		}

		const { firstUserId, secondUserId } = request;
		if (firstUserId === userId) {
			request = await this.conversationRequestRepository.firstUserAccepted(requestId);
			if (request.isSecondUserAccepted) {
				this.conversationRequestRepository.accepted(request.id.toString());
			}
		} else if (secondUserId === userId) {
			request = await this.conversationRequestRepository.secondUserAccepted(requestId);
			if (request.isFirstUserAccepted) {
				this.conversationRequestRepository.accepted(request.id.toString());
			}
		} else {
			throw new BadRequestException([
				{
					message: 'request not belong to user'
				}
			]);
		}

		return request;
	}

	async rejectConversationRequest(requestId: string, userId: string) {
		const request = await this.conversationRequestRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'conversation request not found'
				}
			]);

		if (request.status === 'accepted')
			throw new BadRequestException([
				{
					message: 'request already accepted'
				}
			]);

		if (request.firstUserId === request.secondUserId)
			throw new BadRequestException([
				{
					message: 'cannot sent conversation request for yourself'
				}
			]);

		if (request.firstUserId !== userId && request.secondUserId !== userId)
			throw new BadRequestException([
				{
					message: 'request not belong to user'
				}
			]);

		return this.conversationRequestRepository.reject(requestId);
	}

	async timeout(requestId: string, userId: string) {
		const request = await this.conversationRequestRepository.findOneById(requestId);
		if (!request)
			throw new NotFoundException([
				{
					message: 'conversation request not found'
				}
			]);

		if (Date.now() - request.expiratedAt.getTime() < 0) {
			throw new BadRequestException([
				{
					message: 'request not expired'
				}
			]);
		}

		if (request.firstUserId !== userId || request.secondUserId !== userId)
			throw new BadRequestException([
				{
					message: 'request not belong to user'
				}
			]);

		this.conversationRequestRepository.reject(requestId);
	}

	async getConversationRequestBetweenTwoUsers(id1: string, id2: string) {
		return this.conversationRequestRepository.getConversationRequestBetweenTwoUsers(id1, id2);
	}
}
