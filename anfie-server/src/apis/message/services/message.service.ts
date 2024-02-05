import { Injectable } from '@nestjs/common';
import { GetMessagesDto, UpdateMessageDto } from '../dto';
import { ConversationService } from 'src/apis/conversation/services';
import { MessageRepository } from '../repositories';
import { MessageMediaService } from 'src/apis/message-media/message-media.service';

@Injectable()
export class MessageService {
	constructor(
		private readonly conversationService: ConversationService,
		private readonly messageRepository: MessageRepository,
		private readonly messageMediaService: MessageMediaService
	) {}
	async create(createMessageParams: TCreateMessageParams) {
		await this.conversationService.findOneById(createMessageParams.conversationId);

		const message = await this.messageRepository.createOne(createMessageParams);

		await this.conversationService.updateLastMessage({
			conversationId: createMessageParams.conversationId,
			messageId: message.id
		});

		this.messageMediaService.create(message.id, createMessageParams.medias);

		return message;
	}

	async getMessagesFromConversation(conversationId: number, query: GetMessagesDto) {
		return this.messageRepository.getMessagesFromConversation(conversationId, query);
	}

	findAll() {
		return `This action returns all message`;
	}

	findOne(id: number) {
		return `This action returns a #${id} message`;
	}

	update(id: number, updateMessageDto: UpdateMessageDto) {
		return `This action updates a #${id} message`;
	}

	remove(id: number) {
		return `This action removes a #${id} message`;
	}
}
