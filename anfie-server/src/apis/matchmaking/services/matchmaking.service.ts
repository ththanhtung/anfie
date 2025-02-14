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
	async matchmaking(usersOnline: string[]) {
		// console.log({ dto });

		const users = await this.userService.finUsersFindFriend();

		if (users.length < 2) {
			return;
		}

		const usersOnlineAndFindFriend = users.filter((user) => usersOnline.includes(user.id) && user.isFindFriend);

		const usersInQueue = usersOnlineAndFindFriend.map((user) => user.id);
		// const usersInQueue = ['3d1bdf26-3b40-4c63-b05a-9598790f9cde', '10287ec7-ca50-49ed-b950-dcbcecb77cb0'];

		const userProfiles = await this.userProfileService.getProfilesByUserIds(usersInQueue);

		const match = await this.llamaService.matchRequest(userProfiles);

		if (!match) {
			return;
		}

		const isFriend = await this.friendService.isFriend(match.id1, match.id2);

		if (isFriend) {
			return;
		}

		const existedConversation = await this.conversataionRequestServide.getConversationRequestBetweenTwoUsers(match.id1, match.id2);

		if (existedConversation) {
			const conversationDuration = Date.now() - existedConversation.created_at.getTime();

			if (conversationDuration <= FIFTEEN_MINUTES) {
				return;
			}
		}

		await this.userService.foundMatch(match.id1);
		await this.userService.foundMatch(match.id2);

		return match;
	}
}
