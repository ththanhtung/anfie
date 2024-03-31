import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageRequestsService } from './services/message-requests.service';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { GetCurrentUser } from 'src/common';
import { GetMessageRequestsDto } from './dto';

@Controller('message-requests')
export class MessageRequestsController {
	constructor(private readonly messageRequestsService: MessageRequestsService) {}
	@Post()
	async createMessageRequest(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateMessageRequestDto) {
		return this.messageRequestsService.createOne(user.userId.toString(), dto.receiverId);
	}

	@Get()
	getFriendRequests(@GetCurrentUser() user: TUserJwt, @Query() query: GetMessageRequestsDto) {
		return this.messageRequestsService.getMessageRequests(user, query);
	}

	@Post(':id/accept')
	acceptMessageRequest(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.messageRequestsService.acceptMessageRequest(id, user.userId.toString());
	}

	@Delete(':id/cancel')
	async cancelMessageRequest(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.messageRequestsService.cancelMessageRequest(id, user.userId.toString());
	}

	@Patch(':id/reject')
	async rejectMessageRequest(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.messageRequestsService.rejectFriendRequest(id, user.userId.toString());
	}
}
