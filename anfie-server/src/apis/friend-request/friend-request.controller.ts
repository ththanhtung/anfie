import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FriendRequestService } from './services/friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { AtGuard, GetCurrentUser } from 'src/common';

@UseGuards(AtGuard)
@Controller('friend-request')
export class FriendRequestController {
	constructor(private readonly friendRequestService: FriendRequestService) {}

	@Delete(':id/cancel')
	remove(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.friendRequestService.cancelFriendRequest(id, user.userId.toString());
	}

	
}
