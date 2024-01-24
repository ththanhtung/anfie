import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { AtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('conversations')
export class ConversationController {
	constructor(
		private readonly conversationService: ConversationService,
		private readonly events: EventEmitter2
	) {}

	@Post()
	@UseGuards(AtGuard)
	async create(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateConversationDto) { 
		const conversation = await this.conversationService.create(user, dto);
		this.events.emit('conversation.created', conversation);
		return conversation;
	}

	@Get()
	findAll() {
		return this.conversationService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.conversationService.findOne(+id);
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
