import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { FriendService } from './services/friend.service';
import { CreateFriendAdminDto } from './dto';

@Controller('friends/admin')
export class FriendAdminController {
	constructor(private readonly friendService: FriendService) {}
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createOne(@Body() dto: CreateFriendAdminDto) {
		return this.friendService.createOne(dto.user1, dto.user2);
	}
}
