import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageRequestsService } from './services/message-requests.service';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { UpdateMessageRequestDto } from './dto/update-message-request.dto';

@Controller('message-requests')
export class MessageRequestsController {
	constructor(private readonly messageRequestsService: MessageRequestsService) {}
}
