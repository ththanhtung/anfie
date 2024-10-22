import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AlleyService } from './services/alley.service';
import { CreateAlleyDto } from './dto/create-alley.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetAlleysDto } from './dto';

@UseGuards(AtGuard)
@Controller('alleys')
export class AlleyController {
	constructor(private readonly alleyService: AlleyService) {}
	@Post()
	async CreateAlleyDto(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateAlleyDto) {
		return this.alleyService.createAlley(user, dto);
	}

	@Get('/:id/children')
	async getAlleyByParentId(@Param('id') parentId: string, @Query() query: GetAlleysDto) {
		return this.alleyService.getAlleyByParentId(parentId, query);
	}

	@Get(':id')
	async getOneById(@Param('id') id: string) {
		return this.alleyService.findOneById(id);
	}

	@Get('/')
	async getFirstAlley(@GetCurrentUser() user: TUserJwt) {
		return this.alleyService.getFirstAlley(user);
	}
}
