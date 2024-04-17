import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetMessagesDto } from './dto';

@UseGuards(AtGuard)
@Controller('conversations/:conversationId/messages')
export class MessageController {
	constructor(
		private readonly messageService: MessageService,
		private readonly events: EventEmitter2
	) {}

	@Post()
	@UseInterceptors(FilesInterceptor('medias'))
	async create(
		@GetCurrentUser() user: TUserJwt,
		@Param('conversationId', ParseIntPipe) conversationId: number,
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
	async getMessagesFromConversation(@Param('conversationId', ParseIntPipe) conversationId: number, @Query() query: GetMessagesDto) {
		return this.messageService.getMessagesFromConversation(conversationId, query);
	}
}
