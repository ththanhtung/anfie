import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './services';
import { AtGuard, GetCurrentUser } from 'src/common';
import { DeleteProfileMediasDto, GetMyGroupsDto, UpdateUserProfileDto } from './dto';

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

	@Get('me/groups')
	@HttpCode(200)
	async getMyGroups(@GetCurrentUser('userId') userId: string, @Query() query: GetMyGroupsDto) {
		console.log({ userId });

		// return;
		return this.userService.getMyGroups(userId, query);
	}

	@Delete('me/medias')
	@HttpCode(200)
	async deleteMedias(@GetCurrentUser('userId') userId: string, @Body() dto: DeleteProfileMediasDto) {
		return this.userService.deleteMedias(userId, dto);
	}
}
