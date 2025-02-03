import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { AlleyService } from './services/alley.service';
import { CreateAlleyDto } from './dto/create-alley.dto';
import { AuthAdmin, GetCurrentUser } from 'src/common';
import { GetAlleysDto } from './dto';

@AuthAdmin()
@Controller('alleys/admin')
export class AlleyAdminController {
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

	@Patch(':id/enable')
	async enableAlley(@Param('id') id: string) {
		return this.alleyService.enableAlley(id);
	}

	@Patch(':id/disable')
	async disableAlley(@Param('id') id: string) {
		return this.alleyService.disableAlley(id);
	}
}
