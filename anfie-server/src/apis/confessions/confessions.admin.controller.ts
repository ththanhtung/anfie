import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ConfessionsService } from './services/confessions.service';
import { AtGuard } from 'src/common';
import { GetConfessionsAdminDto } from './dto';

@Controller('confessions/admin')
@UseGuards(AtGuard)
export class ConfessionsAdminController {
	constructor(private readonly confestionsService: ConfessionsService) {}

	@Get()
	async getConfestionsRandom(@Query() query: GetConfessionsAdminDto) {
		return this.confestionsService.getConfessions(query);
	}
}
