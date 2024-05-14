import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repositories';
import { CreateUserProfileDto, UpdateUserProfileDto } from '../dto';
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

	async updateUserProfile(userId: string, dto: UpdateUserProfileDto) {
		const preferences = await this.preferencesService.findByNames(dto.preferences ?? []);
		const preferGenfers = await this.preferGendersService.findByNames(dto.preferGenders ?? []);
		const locations = await this.locationService.findByNames(dto.locations ?? []);
		const profile = await this.userProfileRepository.getProfileByUserId(userId);

		console.log({ dto, profile });

		const updatedProfile: UserProfiles = {
			...profile,
			...dto,
			...(dto.locations && dto.locations.length > 0 ? { locations: locations } : { locations: profile.locations }),
			...(dto.preferences && dto.preferences.length > 0 ? { preferences: preferences } : { preferences: profile.preferences }),
			...(dto.preferGenders && dto.preferGenders.length > 0
				? { preferGenders: preferGenfers }
				: { preferGenders: profile.preferGenders })
		};

		return this.userProfileRepository.updateUserPreferences(updatedProfile);
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
