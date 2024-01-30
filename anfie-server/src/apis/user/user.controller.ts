import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './services';
import { CreateUserDto } from './dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/create')
	@HttpCode(201)
	async createUser(@Body() dto: CreateUserDto) {
		return this.userService.createOne(dto);
	}
}
