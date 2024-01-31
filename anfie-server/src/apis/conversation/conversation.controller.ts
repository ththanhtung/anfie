import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
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

	@Post()
	async create(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateConversationDto) {
		const conversation = await this.conversationService.create(user, dto);
		this.events.emit('conversation.created', conversation);
		return conversation;
	}

	@Get()
	async findAll(@GetCurrentUser() user: TUserJwt, @Query() query: GetConversationsDto) {
		return this.conversationService.findAll(user.userId, query);
	} 

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.conversationService.findOneById(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
		return this.conversationService.update(+id, updateConversationDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.conversationService.remove(+id);
	}
}
