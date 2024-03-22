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
	async leaveGroup() {}

	@Delete(':userId')
	async removeRecipient() {}
}
