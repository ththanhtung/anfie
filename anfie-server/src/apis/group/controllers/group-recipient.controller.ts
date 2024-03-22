import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AtGuard, GetCurrentUser } from 'src/common';
import { AddRecipientDto } from '../dto';
import { GroupService } from '../services/group.service';

@UseGuards(AtGuard)
@Controller('groups/:id/recipient')
export class GroupRecipientController {
	constructor(private readonly groupService: GroupService) {}
	@Post()
	async addRecipient(@GetCurrentUser() user: TUserJwt, @Param('id') groupId: string, @Body() addRecipientDto: AddRecipientDto) {
		return this.groupService.addRecipient(user, groupId, addRecipientDto);
	}

	@Delete('leave')
	async leaveGroup(@Param('id') groupId, @GetCurrentUser() user: TUserJwt) {
		return this.groupService.leaveGroup(groupId, user.userId.toString());
	}

	@Delete(':userId')
	async removeRecipient(@Param('id') groupId: string, @GetCurrentUser() user: TUserJwt, @Param('userId') removeUserId: string) {
		return this.groupService.removeRecipient(groupId, user.userId.toString(), removeUserId);
	}
}
