import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UpdateConversationDto } from '../dto/update-conversation.dto';
import { UserService } from 'src/apis/user/services';
import { ConversationRepository } from '../repositories';

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

	findAll() {
		return `This action returns all conversation`;
	}

	findOne(id: number) {
		return `This action returns a #${id} conversation`;
	}

	update(id: number, updateConversationDto: UpdateConversationDto) {
		return `This action updates a #${id} conversation`;
	}

	remove(id: number) {
		return `This action removes a #${id} conversation`;
	}
}
