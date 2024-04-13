import { Body, Controller, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { UserProfileService } from './services';
import { UpdateUserPreferencesDto } from './dto';
import { AtGuard, GetCurrentUser } from 'src/common';

@UseGuards(AtGuard)
@Controller('user-profile')
export class UserProfileController {
	constructor(private readonly userProfileService: UserProfileService) {}

	@Patch('preferences')
	@HttpCode(200)
	async updateUserPreferences(@GetCurrentUser('userId') userId: string, @Body() dto: UpdateUserPreferencesDto) {
		return this.userProfileService.updateUserPreferences(userId, dto);
	}
}
