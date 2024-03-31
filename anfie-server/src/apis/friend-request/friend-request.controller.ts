import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { FriendRequestService } from './services/friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetFriendRequestsDto } from './dto';

@UseGuards(AtGuard)
@Controller('friend-request')
export class FriendRequestController {
	constructor(private readonly friendRequestService: FriendRequestService) {}
	@Post()
	async createFriendRequest(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateFriendRequestDto) {
		return this.friendRequestService.createOne(user.userId.toString(), dto.receiverId);
	}

	@Get()
	getFriendRequests(@GetCurrentUser() user: TUserJwt, @Query() query: GetFriendRequestsDto) {
		return this.friendRequestService.getFriendRequests(user, query);
	}

	@Post(':id/accept')
	acceptFriendRequest(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.friendRequestService.acceptFriendRequest(id, user.userId.toString());
	}

	@Delete(':id/cancel')
	async cancelFriendRequest(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.friendRequestService.cancelFriendRequest(id, user.userId.toString());
	}

	@Patch(':id/reject')
	async rejectFriendRequest(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.friendRequestService.rejectFriendRequest(id, user.userId.toString());
	}
}
