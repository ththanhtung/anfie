import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { AdminUpdateUserProfileDto } from '../dto';
import { UserProfileService } from './user-profile.service';
import { PreferencesService } from 'src/apis/preferences/services';
import { LocationsService } from 'src/apis/locations/services';
import { PreferGenderService } from 'src/apis/prefer-gender/services';
import { UserProfiles } from '../entities';

@Injectable()
export class AdminUserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userProfileService: UserProfileService,
		private readonly preferencesService: PreferencesService,
		private readonly locationService: LocationsService,
		private readonly preferGendersService: PreferGenderService
	) {}
	async updateOne(userId: string, dto: AdminUpdateUserProfileDto) {
		console.log({ dto });
		const preferences = await this.preferencesService.findByNames(dto.preferences ?? []);
		const preferGenfers = await this.preferGendersService.findByNames(dto.preferGenders ?? []);
		const selfDescribed = await this.preferencesService.findByNames(dto.selfDescribed ?? []);
		const locations = await this.locationService.findByNames(dto.locations ?? []);
		const profile = await this.userProfileService.getProfileByUserId(userId);
		delete dto.id;

		const updatedProfile: UserProfiles = await this.userProfileService.updateUserProfile({
			...profile,
			...dto,
			...(dto.locations && dto.locations.length > 0 ? { locations: locations } : { locations: profile.locations }),
			...(dto.preferences && dto.preferences.length > 0 ? { preferences: preferences } : { preferences: profile.preferences }),
			...(dto.preferGenders && dto.preferGenders.length > 0
				? { preferGenders: preferGenfers }
				: { preferGenders: profile.preferGenders }),
			...(dto.selfDescribed && dto.selfDescribed.length > 0
				? { selfDescribed: selfDescribed }
				: { selfDescribed: profile.selfDescribed }),
			...(dto.isBanned ? { isBanned: dto.isBanned } : { isBanned: profile.isBanned })
		});

		const updatedUser = await this.userRepository.updateUserInfo({ ...dto, id: userId });

		return {
			...updatedProfile,
			...updatedUser
		};
	}
}
