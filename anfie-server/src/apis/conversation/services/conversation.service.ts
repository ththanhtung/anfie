import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UpdateConversationDto } from '../dto/update-conversation.dto';
import { UserService } from 'src/apis/user/services';
import { ConversationRepository } from '../repositories';
import { GetConversationsDto } from '../dto';
import { pagination } from 'src/common';

@Injectable()
export class ConversationService {
	constructor(
		private readonly userServies: UserService,
		private readonly conversationRepository: ConversationRepository
	) {}
	async create(user: TUserJwt, createConversationDto: CreateConversationDto) {
		const recipient = await this.userServies.findOneById(createConversationDto.recipientId);
		await this.conversationRepository.checkExist(user.userId, recipient.id);
		const conversation = await this.conversationRepository.createOne(user, createConversationDto);
		return conversation;
	}

	async findAll(userId: number, query: GetConversationsDto) {
		return this.conversationRepository.getConversations(userId, query);
	}

	findOneById(id: number) {
		return this.conversationRepository.findOneById(id);
	}

	update(id: number, updateConversationDto: UpdateConversationDto) {
		return `This action updates a #${id} conversation`;
	}

	remove(id: number) {
		return `This action removes a #${id} conversation`;
	}
}
