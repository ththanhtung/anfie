import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UserService } from 'src/apis/user/services';
import { ConversationRepository } from '../repositories';

@Injectable()
export class ConversationAdminService {
	constructor(
		private readonly userServies: UserService,
		private readonly conversationRepository: ConversationRepository
	) {}
	async create(createConversationDto: CreateConversationDto) {
		const user1 = await this.userServies.findOneById(+createConversationDto.user1);
		const user2 = await this.userServies.findOneById(+createConversationDto.user2);
		await this.conversationRepository.checkExist(user1.id, user2.id);
		const conversation = await this.conversationRepository.createOne(createConversationDto);
		return conversation;
	}
}
