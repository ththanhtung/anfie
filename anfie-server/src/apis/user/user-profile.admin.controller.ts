import { Body, Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { AdminUserService, UserProfileService } from './services';
import { AuthAdmin } from 'src/common';
import { AdminUpdateUserProfileDto } from './dto';

@AuthAdmin()
@Controller('user-profiles')
export class UserProfileAdminController {
	constructor(
		private readonly userProfileService: UserProfileService,
		private readonly userService: AdminUserService
	) {}

	@Get('admin/:id')
	@HttpCode(200)
	async getProfileByUserId(@Param('id') userId: string) {
		return this.userProfileService.getProfileByUserId(userId);
	}

	@Patch('/admin/:userId')
	@HttpCode(200)
	async updateUserProfile(@Param('userId') userId: string, @Body() dto: AdminUpdateUserProfileDto) {
		return this.userService.updateOne(userId, dto);
	}
}
