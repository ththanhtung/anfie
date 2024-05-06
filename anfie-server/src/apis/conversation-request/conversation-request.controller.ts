import { Controller, Get, Post, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { ConversationRequestService } from './services/conversation-request.service';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetConversationRequestsDto } from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@UseGuards(AtGuard)
@Controller('conversation-request')
export class ConversationRequestController {
	constructor(
		private readonly conversationRequestService: ConversationRequestService,
		private readonly events: EventEmitter2
	) {}

	@Get()
	getConversationRequests(@GetCurrentUser('userId') userId: string, @Query() query: GetConversationRequestsDto) {
		return this.conversationRequestService.getConversationRequests(userId, query);
	}

	@Post(':id/accept')
	async acceptConversationRequest(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
		const conversationRequest = await this.conversationRequestService.acceptConversationRequest(id, userId);
		this.events.emit('conversation-request.accepted', conversationRequest);
		return conversationRequest;
	}

	@Patch(':id/reject')
	async rejectConversationRequest(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
		const conversationRequest = await this.conversationRequestService.rejectConversationRequest(id, userId);
		this.events.emit('conversation-request.rejected', conversationRequest);
		return conversationRequest;
	}

	@Patch(':id/timeout')
	async timeoutConversationRequest(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
		return this.conversationRequestService.timeout(id, userId);
	}
}
