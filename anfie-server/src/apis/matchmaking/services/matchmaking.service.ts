import { Injectable } from '@nestjs/common';
import { ConversationRequestService } from 'src/apis/conversation-request/services';
import { FriendService } from 'src/apis/friend/services';
import { LlamaService } from 'src/apis/llama/llama.service';
import { UserProfileService, UserService } from 'src/apis/user/services';
import { FIFTEEN_MINUTES } from 'src/common';

@Injectable()
export class MatchmakingService {
	constructor(
		private readonly llamaService: LlamaService,
		private readonly userProfileService: UserProfileService,
		private readonly userService: UserService,
		private readonly conversataionRequestServide: ConversationRequestService,
		private readonly friendService: FriendService
	) {}
	async matchmaking() {
		// console.log({ dto });

		// const users = await this.userService.finUsersFindFriend();

		// if (users.length < 2) {
		// 	return;
		// }

		// const usersInQueue = users.map((user) => user.id);
		const usersInQueue = ['3d1bdf26-3b40-4c63-b05a-9598790f9cde', '10287ec7-ca50-49ed-b950-dcbcecb77cb0'];


		const isFriend = await this.friendService.isFriend(usersInQueue[0], usersInQueue[1]);

		if (isFriend) {
			return;
		}

		const existedConversation = await this.conversataionRequestServide.getConversationRequestBetweenTwoUsers(
			usersInQueue[0],
			usersInQueue[1]
		);

		if (existedConversation) {
			const conversationDuration = Date.now() - existedConversation.created_at.getTime();

			if (conversationDuration <= FIFTEEN_MINUTES) {
				return;
			}
		}

		// const userProfiles = await this.userProfileService.getProfilesByUserIds(usersInQueue);

		// const match = await this.llamaService.matchRequest(userProfiles);

		// if (!match) {
		// 	return;
		// }

		// console.log({ match });

		// await this.userService.foundMatch(match.id1);
		// await this.userService.foundMatch(match.id2);

		return {
			id1: '3d1bdf26-3b40-4c63-b05a-9598790f9cde',
			id2: '10287ec7-ca50-49ed-b950-dcbcecb77cb0',
			reason: 'test'
		};
	}
}
