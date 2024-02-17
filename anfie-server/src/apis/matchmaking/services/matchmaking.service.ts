import { Injectable } from '@nestjs/common';
import { CreateMatchmakingDto } from '../dto';
import { getRandomUsers } from 'src/common';
import { ConversationService } from 'src/apis/conversation/services';

@Injectable()
export class MatchmakingService {
	constructor(private readonly conversationService: ConversationService) {}
	async matchmaking(dto: CreateMatchmakingDto) {
		const users = getRandomUsers(dto.userIds, 2);
		console.log({ users });
		const conversation = await this.conversationService.findOneByUserIds(users[0], users[1]);
		console.log({ conversation });

		if (Boolean(conversation)) {
			console.log('conversation existed');
			return;
		}
		return this.conversationService.create(users[0], {
			recipientId: users[1]
		});
	}
}
