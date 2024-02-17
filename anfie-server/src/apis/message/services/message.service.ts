import { Injectable } from '@nestjs/common';
import { GetMessagesDto, UpdateMessageDto } from '../dto';
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
