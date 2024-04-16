import { Controller, Get, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { AtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetConversationsDto } from './dto';

@UseGuards(AtGuard)
@Controller('conversations')
export class ConversationController {
	constructor(
		private readonly conversationService: ConversationService,
		private readonly events: EventEmitter2
	) {}

	@Get()
	async findAll(@GetCurrentUser() user: TUserJwt, @Query() query: GetConversationsDto) {
		return this.conversationService.findAll(user.userId, query);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.conversationService.findOneById(+id);
	}

	@Delete(':id')
	deleteOneById(@Param('id') id: string) {
		return this.conversationService.deleteOneById(+id);
	}
}
