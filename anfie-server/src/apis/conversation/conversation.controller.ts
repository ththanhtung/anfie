import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { AtGuard } from 'src/common/guards';
import { AuthAdmin, GetCurrentUser, UsePermission } from 'src/common/decorators';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetConversationsDto } from './dto';
import { Permission, RoleGuard } from 'src/common';

@UseGuards(AtGuard)
@Controller('conversations')
export class ConversationController {
	constructor(
		private readonly conversationService: ConversationService,
		private readonly events: EventEmitter2
	) {}

	@Post()
	async create(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateConversationDto) {
		const conversation = await this.conversationService.create(user.userId, dto);
		this.events.emit('conversation.created', conversation);
		return conversation;
	}

	@Get()
	// @AuthAdmin(Permission.CONVERSATION_GET_LIST)
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
