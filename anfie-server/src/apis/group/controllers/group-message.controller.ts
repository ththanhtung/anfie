import { Controller, Post, Body, UseGuards, Get, Query, UseInterceptors, Param, UploadedFiles } from '@nestjs/common';
import { AtGuard, GetCurrentUser } from 'src/common';
import { CreateGroupMessageDto, GetGroupMessagesDto } from '../dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GroupMessageService } from '../services';

@Controller('groups/:id/messages')
@UseGuards(AtGuard)
export class GroupMessagesController {
	constructor(
		private readonly events: EventEmitter2,
		private readonly groupMessageService: GroupMessageService
	) {}

	@Post()
	@UseInterceptors(FilesInterceptor('medias'))
	async create(
		@GetCurrentUser() user: TUserJwt,
		@Param('id') groupId: string,
		@UploadedFiles() medias: Express.Multer.File[],
		@Body() createMessageDto: CreateGroupMessageDto
	) {
		const message = await this.groupMessageService.create({
			userId: user.userId,
			groupId: groupId,
			medias: medias,
			...createMessageDto
		});

		this.events.emit('group-messages.created', message);

		return message;
	}

	@Get()
	async getGroupMessagesFromGroupConversation(@Param('id') groupId: string, @Query() query: GetGroupMessagesDto) {
		return this.groupMessageService.getGroupMessagesFromGroupConversation(groupId, query);
	}
}
