import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ConfessionsService } from './services/confessions.service';
import { CreateConfestionDto } from './dto/create-confession.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetConfestionsDto } from './dto';

@Controller('confessions')
@UseGuards(AtGuard)
export class ConfessionsController {
	constructor(private readonly confestionsService: ConfessionsService) {}

	@Post()
	async createOne(@GetCurrentUser('userId') userId: string, @Body() createConfestionDto: CreateConfestionDto) {
		return this.confestionsService.createOne(userId, createConfestionDto);
	}

	@Get()
	async getConfestionsRandom(@Query() query: GetConfestionsDto) {
		return this.confestionsService.getConfestionsRandom(query);
	}
}
