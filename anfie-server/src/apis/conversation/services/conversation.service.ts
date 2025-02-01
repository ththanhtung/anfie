import { BadRequestException, Injectable } from '@nestjs/common';
import { ConversationRepository } from '../repositories';
import { GetConversationsDto } from '../dto';
import { FIFTEEN_MINUTES } from 'src/common';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class ConversationService {
	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly userServies: UserService
	) {}
	async findOneByUserIds(creatorId: string, recipientId: string) {
		return this.conversationRepository.findOneByUserIds(creatorId, recipientId);
	}

	async findAll(userId: string, query: GetConversationsDto) {
		return this.conversationRepository.getConversations(userId, query);
	}

	async updateLastMessage({ conversationId, messageId }: TUpdateLastMessageParams) {
		return this.conversationRepository.updateLastMessage({ conversationId, messageId });
	}

	findOneById(id: string) {
		return this.conversationRepository.findOneById(id);
	}

	async deleteOneById(id: string) {
		const conversation = await this.conversationRepository.findOneById(id);
		const conversationDuration = Date.now() - conversation.created_at.getTime();

		if (conversationDuration <= FIFTEEN_MINUTES) {
			throw new BadRequestException([
				{
					message: 'conversation must be at least 15 minutes'
				}
			]);
		}

		await this.userServies.increaseConversationSlot(conversation.creatorId);
		await this.userServies.increaseConversationSlot(conversation.recipientId);

		return this.conversationRepository.deleteOneById(id);
	}

	async toggleConversationMode(id: string) {
		return this.conversationRepository.toggleConversationMode(id);
	}
}
