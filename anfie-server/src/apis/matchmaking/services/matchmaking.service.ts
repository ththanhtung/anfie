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
		const users = await this.userService.finUsersFindFriend();

		const usersOnlineAndFindFriend = users.filter((user) => usersOnline.includes(user.id) && user.isFindFriend);

		if (usersOnlineAndFindFriend.length < 2) {
			return;
		}

		const usersInQueue = usersOnlineAndFindFriend.map((user) => user.id);

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
