import { Body, Controller, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './services';
import { AtGuard, GetCurrentUser } from 'src/common';
import { UpdateUserProfileDto } from './dto';

@Controller('user')
@UseGuards(AtGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Patch('me')
	@HttpCode(200)
	async updateUserProfile(@GetCurrentUser('userId') userId: string, @Body() dto: UpdateUserProfileDto) {
		console.log({ userId });

		// return;
		return this.userService.updateOne(userId, dto);
	}

	@Post('find-new-friend')
	@HttpCode(200)
	async toggleFindingFriend(@GetCurrentUser('userId') userId: string) {
		console.log({ userId });

		// return;
		return this.userService.toggleFindingFriend(userId);
	}
}
