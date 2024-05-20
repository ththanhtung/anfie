import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repositories';
import { CreateUserProfileDto } from '../dto';
import { PreferencesService } from 'src/apis/preferences/services';
import { LocationsService } from 'src/apis/locations/services';
import { UserProfiles } from '../entities';
import { PreferGenderService } from 'src/apis/prefer-gender/services';

@Injectable()
export class UserProfileService {
	constructor(
		private readonly userProfileRepository: UserProfileRepository,
		private readonly preferencesService: PreferencesService,
		private readonly locationService: LocationsService,
		private readonly preferGendersService: PreferGenderService
	) {}

	async createOne(user: CreateUserProfileDto) {
		return this.userProfileRepository.createOne(user);
	}

	async updateOne(user: any) {
		return this.userProfileRepository.updateOne(user);
	}

	async updateUserProfile(profile: UserProfiles) {
		return this.userProfileRepository.updateUserPreferences(profile);
	}

	async getProfileByUserId(id: string) {
		return this.userProfileRepository.getProfileByUserId(id);
	}

	async getProfilesByUserIds(ids: string[]) {
		return this.userProfileRepository.getProfilesByUserIds(ids);
	}

	async reduceStrangerConversationSlotByOne(userId: string) {
		return this.userProfileRepository.reduceStrangerConversationSlotByOne(userId);
	}

	async increaseReportedCountByOne(userId: string) {
		return this.userProfileRepository.increaseReportedCountByOne(userId);
	}
}
