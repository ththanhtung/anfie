import { Injectable } from '@nestjs/common';
import { GetMessagesDto } from '../dto';
import { ConversationService } from 'src/apis/conversation/services';
import { MessageRepository } from '../repositories';
import { MessageMediaService } from 'src/apis/message-media/message-media.service';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class MessageService {
	constructor(
		private readonly conversationService: ConversationService,
		private readonly messageRepository: MessageRepository,
		private readonly messageMediaService: MessageMediaService,
		private readonly userServices: UserService
	) {}
	async create(createMessageParams: TCreateMessageParams) {
		const conversation = await this.conversationService.findOneById(createMessageParams.conversationId);

		const message = await this.messageRepository.createOne(createMessageParams);

		await this.conversationService.updateLastMessage({
			conversationId: createMessageParams.conversationId,
			messageId: message.id
		});

		await this.messageMediaService.create(message.id, createMessageParams.medias);

		const updatedMessage = await this.messageRepository.getMessagesByIds([message.id]);

		return { ...updatedMessage[0], conversation };
	}

	async getMessagesFromConversation(conversationId: string, query: GetMessagesDto) {
		return this.messageRepository.getMessagesFromConversation(conversationId, query);
	}

	async getMessagesByIds(ids: string[]) {
		return this.messageRepository.getMessagesByIds(ids);
	}
}
