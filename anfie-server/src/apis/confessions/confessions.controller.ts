import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ConfessionsService } from './services/confessions.service';
import { CreateConfestionDto } from './dto/create-confession.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetConfestionsDto } from './dto';

@Controller('confestions')
@UseGuards(AtGuard)
export class ConfessionsController {
	constructor(private readonly confestionsService: ConfessionsService) {}

	@Post()
	async createOne(@GetCurrentUser() user: TUserJwt, @Body() createConfestionDto: CreateConfestionDto) {
		return this.confestionsService.createOne(user, createConfestionDto);
	}

	@Get()
	async getConfestions(@Query() query: GetConfestionsDto) {
		return this.confestionsService.getConfestions(query);
	}
}
