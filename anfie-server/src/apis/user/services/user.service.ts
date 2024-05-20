import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserDto, UpdateUserProfileDto } from '../dto';
import { UserProfileService } from './user-profile.service';
import { PreferencesService } from 'src/apis/preferences/services';
import { LocationsService } from 'src/apis/locations/services';
import { PreferGenderService } from 'src/apis/prefer-gender/services';
import { UserProfiles } from '../entities';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userProfileService: UserProfileService,
		private readonly preferencesService: PreferencesService,
		private readonly locationService: LocationsService,
		private readonly preferGendersService: PreferGenderService
	) {}

	async createOne(dto: CreateUserDto) {
		const user = await this.userRepository.createOne(dto);

		if (!user) {
			throw new InternalServerErrorException([
				{
					message: 'fail to create user'
				}
			]);
		}

		const profile = await this.userProfileService.createOne({ userId: user.id, ...dto });

		return {
			...user,
			...profile
		};
	}

	async updateOne(userId: string, dto: UpdateUserProfileDto) {
		const preferences = await this.preferencesService.findByNames(dto.preferences ?? []);
		const preferGenfers = await this.preferGendersService.findByNames(dto.preferGenders ?? []);
		const locations = await this.locationService.findByNames(dto.locations ?? []);
		const profile = await this.userProfileService.getProfileByUserId(userId);

		console.log({ dto, profile });

		const updatedProfile: UserProfiles = await this.userProfileService.updateUserProfile({
			...profile,
			...dto,
			...(dto.locations && dto.locations.length > 0 ? { locations: locations } : { locations: profile.locations }),
			...(dto.preferences && dto.preferences.length > 0 ? { preferences: preferences } : { preferences: profile.preferences }),
			...(dto.preferGenders && dto.preferGenders.length > 0
				? { preferGenders: preferGenfers }
				: { preferGenders: profile.preferGenders })
		});

		const updatedUser = await this.userRepository.updateUserInfo({ ...dto, id: userId });

		return {
			...updatedProfile,
			...updatedUser
		};
	}

	async checkExist(email: string) {
		return await this.userRepository.checkExist(email);
	}

	async findOneByEmail(email: string) {
		return this.userRepository.findOneByEmail(email);
	}

	async findOneById(id: string) {
		return this.userRepository.findOneById(id);
	}

	async updateRefreshToken(userId: string, refreshToken: string | null) {
		return this.userRepository.updateRefreshToken(userId, refreshToken);
	}

	async findOneByRefreshToken(refreshToken: string) {
		return this.userRepository.findOneByRefreshToken(refreshToken);
	}
	async updateAccessToken(userId: string, refreshToken: string | null) {
		return this.userRepository.updateAccessToken(userId, refreshToken);
	}

	async findOneByAccessToken(refreshToken: string) {
		return this.userRepository.findOneByAccessToken(refreshToken);
	}

	async findUsersByIds(ids: string[]) {
		return this.userRepository.findUsersByIds(ids);
	}
}
