import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConversationAdminService } from './services';
import { AuthAdmin } from 'src/common';

@AuthAdmin() 
@Controller('conversations/admin')
export class ConversationAdminController {
	constructor(
		private readonly conversationAdminService: ConversationAdminService,
		private readonly events: EventEmitter2
	) {}

	@Post()
	async create(@Body() dto: CreateConversationDto) {
		const conversation = await this.conversationAdminService.create(dto);
		this.events.emit('conversation.created', conversation);
		return conversation;
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		console.log('test');
		return this.conversationAdminService.findOneById(id);
	}
}
