import { Injectable } from '@nestjs/common';
import { CreateMatchmakingDto } from '../dto';
import { ConversationAdminService, ConversationService } from 'src/apis/conversation/services';
import { OpenAIService } from 'src/apis/openai/openai.service';
import { UserProfileService } from 'src/apis/user/services';

@Injectable()
export class MatchmakingService {
	constructor(
		private readonly conversationAdminService: ConversationAdminService,
		private readonly conversationService: ConversationService,
		private readonly openAIService: OpenAIService,
		private readonly userProfileService: UserProfileService
	) {}
	async matchmaking(dto: CreateMatchmakingDto) {
		const userProfiles = await this.userProfileService.getProfilesByUserIds(dto.userIds.map((u) => u.toString()));

		const match = await this.openAIService.matchRequest(userProfiles);

		console.log({ match });

		return match;
	}
}
