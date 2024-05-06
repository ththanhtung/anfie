import { Controller, Get, Query } from '@nestjs/common';
import { GetConversationRequestsAdminDto } from './dto';
import { ConversationRequestAdminService } from './services';

@Controller('conversation-request/admin')
export class ConversationRequestAdminController {
	constructor(private readonly conversationRequestAdminService: ConversationRequestAdminService) {}

	@Get()
	getConversationRequests(@Query() query: GetConversationRequestsAdminDto) {
		return this.conversationRequestAdminService.getConversationRequests(query);
	}
}
