import { BadRequestException, Injectable } from '@nestjs/common';
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
		const user1 = await this.userServies.findOneById(createConversationDto.user1, true);
		const user2 = await this.userServies.findOneById(createConversationDto.user2, true);

		if (user1.profile.strangerConversationSlots < 1 || user2.profile.strangerConversationSlots < 1) {
			throw new BadRequestException([
				{
					message: 'Insufficient conversation slots'
				}
			]);
		}

		await this.conversationRepository.checkExist(user1.id, user2.id);
		const conversation = await this.conversationRepository.createOne(createConversationDto);
		await this.userServies.reduceConversationSlot(user1.id);
		await this.userServies.reduceConversationSlot(user2.id);
		return conversation;
	}

	findOneById(id: string) {
		return this.conversationRepository.findOneById(id);
	}
}
