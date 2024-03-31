import { Controller, Get, Param, Delete } from '@nestjs/common';
import { FriendService } from './services/friend.service';
import { GetCurrentUser } from 'src/common';

@Controller('friends')
export class FriendController {
	constructor(private readonly friendService: FriendService) {}

	@Get()
	async getFriends(@GetCurrentUser() user: TUserJwt) {
		return this.friendService.getFriends(user);
	}

	@Delete(':id/delete')
	async deleteFriend(@GetCurrentUser() user: TUserJwt, @Param('id') id: string) {
		return this.friendService.deleteFriend(id, user.userId.toString());
	}
}
