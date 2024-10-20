import { Injectable } from '@nestjs/common';
import { LlamaService } from 'src/apis/llama/llama.service';
import { UserProfileService, UserService } from 'src/apis/user/services';

@Injectable()
export class MatchmakingService {
	constructor(
		private readonly llamaService: LlamaService,
		private readonly userProfileService: UserProfileService,
		private readonly userService: UserService
	) {}
	async matchmaking() {
		// console.log({ dto });

		const users = await this.userService.finUsersFindFriend();

		if (users.length < 2) {
			return;
		}

		const usersInQueue = users.map((user) => user.id);

		const userProfiles = await this.userProfileService.getProfilesByUserIds(usersInQueue);

		const match = await this.llamaService.matchRequest(userProfiles);

		if (!match) {
			return;
		}

		console.log({ match });

		await this.userService.foundMatch(match.id1);
		await this.userService.foundMatch(match.id2);

		return match;
	}
}
