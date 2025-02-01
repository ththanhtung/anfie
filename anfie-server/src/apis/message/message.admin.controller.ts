import { Controller, Get, Post, Body, Param, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthAdmin, GetCurrentUser } from 'src/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetMessagesDto } from './dto';

@AuthAdmin()
@Controller('conversations/admin/:conversationId/messages')
export class MessageAdminController {
	constructor(
		private readonly messageService: MessageService,
		private readonly events: EventEmitter2
	) {}

	@Post()
	@UseInterceptors(FilesInterceptor('medias'))
	async create(
		@GetCurrentUser() user: TUserJwt,
		@Param('conversationId') conversationId: string,
		@UploadedFiles() medias: Express.Multer.File[],
		@Body() createMessageDto: CreateMessageDto
	) {
		const message = await this.messageService.create({
			userId: user.userId,
			conversationId,
			medias: medias,
			...createMessageDto
		});

		this.events.emit('messages.created', message);

		return message;
	}

	@Get()
	async getMessagesFromConversation(@Param('conversationId') conversationId: string, @Query() query: GetMessagesDto) {
		return this.messageService.getMessagesFromConversation(conversationId, query);
	}
}
