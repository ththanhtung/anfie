import { Controller, Get, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FriendService } from './services/friend.service';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetFriendsDto } from './dto';

@UseGuards(AtGuard)
@Controller('friends')
export class FriendController {
	constructor(private readonly friendService: FriendService) {}

	@Get()
	async getFriends(@GetCurrentUser('userId') userId: string, @Query() query: GetFriendsDto) {
		return this.friendService.getFriends(userId, query);
	}

	@Delete(':id/delete')
	async deleteFriend(@GetCurrentUser('userId') userId: string, @Param('id') id: string) {
		return this.friendService.deleteFriend(userId, id);
	}
}
