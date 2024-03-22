import { Controller, Delete, Post } from '@nestjs/common';

@Controller('groups/:id/recipient')
export class GroupRecipientController {
	@Post()
	async addRecipient() {}

	@Delete('leave')
	async leaveGroup() {}

	@Delete(':userId')
	async removeRecipient() {}
}
