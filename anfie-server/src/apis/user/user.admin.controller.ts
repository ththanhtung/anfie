import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { UserService } from './services';
import { AtGuard } from 'src/common';
import { GetUsersDto } from './dto';

@Controller('user')
@UseGuards(AtGuard)
export class UserAdminController {
	constructor(private readonly userService: UserService) {}

	@Get('/')
	@HttpCode(200)
	async getAllUsers(@Query() query: GetUsersDto) {
		return this.userService.findAllUsers(query);
	}
}
