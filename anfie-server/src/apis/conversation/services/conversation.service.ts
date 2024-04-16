import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UserService } from 'src/apis/user/services';
import { ConversationRepository } from '../repositories';
import { GetConversationsDto } from '../dto';
import { FIFTEEN_MINUTES } from 'src/common';

@Injectable()
export class ConversationService {
	constructor(
		private readonly userServies: UserService,
		private readonly conversationRepository: ConversationRepository
	) {}
	async create(creatorId: number, createConversationDto: CreateConversationDto) {
		const recipient = await this.userServies.findOneById(createConversationDto.recipientId);
		await this.conversationRepository.checkExist(creatorId, recipient.id);
		const conversation = await this.conversationRepository.createOne(creatorId, createConversationDto);
		return conversation;
	}

	async findOneByUserIds(creatorId: number, recipientId: number) {
		return this.conversationRepository.findOneByUserIds(creatorId, recipientId);
	}

	async findAll(userId: number, query: GetConversationsDto) {
		return this.conversationRepository.getConversations(userId, query);
	}

	async updateLastMessage({ conversationId, messageId }: TUpdateLastMessageParams) {
		return this.conversationRepository.updateLastMessage({ conversationId, messageId });
	}

	findOneById(id: number) {
		return this.conversationRepository.findOneById(id);
	}

	async deleteOneById(id: number) {
		const conversation = await this.conversationRepository.findOneById(id);
		const conversationDuration = Date.now() - conversation.created_at.getTime();

		if (conversationDuration <= FIFTEEN_MINUTES) {
			throw new BadRequestException([
				{
					message: 'conversation must be at least 15 minutes'
				}
			]);
		}

		return this.conversationRepository.deleteOneById(id);
	}
}
