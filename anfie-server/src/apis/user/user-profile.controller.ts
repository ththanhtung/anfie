import { Body, Controller, Get, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { UserProfileService } from './services';
import { UpdateUserProfileDto } from './dto';
import { AtGuard, GetCurrentUser } from 'src/common';

@UseGuards(AtGuard)
@Controller('user-profiles')
export class UserProfileController {
	constructor(private readonly userProfileService: UserProfileService) {}

	@Patch('me')
	@HttpCode(200)
	async updateUserProfile(@GetCurrentUser('userId') userId: string, @Body() dto: UpdateUserProfileDto) {
		return this.userProfileService.updateUserProfile(userId, dto);
	}

	@Get('me')
	@HttpCode(200)
	async getProfileByUserId(@GetCurrentUser('userId') userId: string) {
		return this.userProfileService.getProfileByUserId(userId);
	}
}
