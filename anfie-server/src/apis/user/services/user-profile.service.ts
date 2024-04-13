import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repositories';
import { CreateUserProfileDto, UpdateUserPreferencesDto } from '../dto';
import { PreferencesService } from 'src/apis/preferences/services';
import { LocationsService } from 'src/apis/locations/services';

@Injectable()
export class UserProfileService {
	constructor(
		private readonly userProfileRepository: UserProfileRepository,
		private readonly preferencesService: PreferencesService,
		private readonly locationService: LocationsService
	) {}

	async createOne(user: CreateUserProfileDto) {
		return this.userProfileRepository.createOne(user);
	}

	async updateOne(user: any) {
		return this.userProfileRepository.updateOne(user);
	}

	async findOneById(id: number) {
		return this.userProfileRepository.findOneById(id);
	}

	async updateUserPreferences(userId: string, dto: UpdateUserPreferencesDto) {
		const preferences = await this.preferencesService.findByNames(dto.preferences);
		const locations = await this.locationService.findByNames(dto.locations);
		const profile = await this.userProfileRepository.getProfileByUserId(userId);

		return this.userProfileRepository.updateUserPreferences(profile.id.toString(), { preferences, locations });
	}

	async getProfileByUserId(id: string) {
		return this.userProfileRepository.getProfileByUserId(id);
	}

	async getProfilesByUserIds(ids: string[]) {
		return this.userProfileRepository.getProfilesByUserIds(ids);
	}
}
