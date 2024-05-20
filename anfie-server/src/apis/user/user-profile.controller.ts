import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { UserProfileService } from './services';
import { AtGuard, GetCurrentUser } from 'src/common';

@UseGuards(AtGuard)
@Controller('user-profiles')
export class UserProfileController {
	constructor(private readonly userProfileService: UserProfileService) {}

	@Get('me')
	@HttpCode(200)
	async getProfileByUserId(@GetCurrentUser('userId') userId: string) {
		return this.userProfileService.getProfileByUserId(userId);
	}
}
