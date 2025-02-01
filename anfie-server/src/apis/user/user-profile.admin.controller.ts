import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { UserProfileService } from './services';
import { AtGuard, GetCurrentUser } from 'src/common';

@UseGuards(AtGuard)
@Controller('user-profiles')
export class UserProfileAdminController {
	constructor(private readonly userProfileService: UserProfileService) {}

	@Get('/:id')
	@HttpCode(200)
	async getProfileByUserId(@Param('id') userId: string) {
		return this.userProfileService.getProfileByUserId(userId);
	}
}
