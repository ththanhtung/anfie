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
		const user = await this.userServices.findOneById(message.userId);

		await this.conversationService.updateLastMessage({
			conversationId: createMessageParams.conversationId,
			messageId: message.id
		});

		this.messageMediaService.create(message.id, createMessageParams.medias);

		return { ...message, user, conversation };
	}

	async getMessagesFromConversation(conversationId: string, query: GetMessagesDto) {
		return this.messageRepository.getMessagesFromConversation(conversationId, query);
	}

	async getMessagesByIds(ids: string[]) {
		return this.messageRepository.getMessagesByIds(ids);
	}
}
