import { Controller, Get, Query } from '@nestjs/common';
import { GetFriendRequestsAdminDto } from './dto';
import { FriendRequestAdminService } from './services';

@Controller('friend-requests/admin')
export class FriendRequestAdminController {
	constructor(private readonly friendRequestAdminService: FriendRequestAdminService) {}

	@Get()
	getFriendRequests(@Query() query: GetFriendRequestsAdminDto) {
		return this.friendRequestAdminService.getFriendRequests(query);
	}
}
