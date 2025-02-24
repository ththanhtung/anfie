import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { GetMyGroupsDto, GetUsersDto, UpdateUserProfileDto } from '../dto';
import { UserProfileService } from './user-profile.service';
import { PreferencesService } from 'src/apis/preferences/services';
import { LocationsService } from 'src/apis/locations/services';
import { PreferGenderService } from 'src/apis/prefer-gender/services';
import { UserProfiles } from '../entities';
import { ChangePasswordDto } from 'src/apis/auth/dtos';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userProfileService: UserProfileService,
		private readonly preferencesService: PreferencesService,
		private readonly locationService: LocationsService,
		private readonly preferGendersService: PreferGenderService
	) {}

	async createOne(dto: TSignupParams) {
		const {
			preferGenders: preferGendersString,
			preferences: preferencesString,
			locations: locationsString,
			selfDescribed: selfDescribedString
		} = dto;
		const preferGenders = preferGendersString ? JSON.parse(preferGendersString) : [];
		const selfDescribed = selfDescribedString ? JSON.parse(selfDescribedString) : [];
		const preferences = preferencesString ? JSON.parse(preferencesString) : [];
		const locations = locationsString ? JSON.parse(locationsString) : [];

		const user = await this.userRepository.createOne({
			...dto,
			preferGenders,
			preferences,
			locations,
			selfDescribed
		});

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
			profile
		};
	}

	async updateOne(userId: string, dto: UpdateUserProfileDto) {
		const preferences = await this.preferencesService.findByNames(dto.preferences ?? []);
		const preferGenfers = await this.preferGendersService.findByNames(dto.preferGenders ?? []);
		const selfDescribed = await this.preferencesService.findByNames(dto.selfDescribed ?? []);
		const locations = await this.locationService.findByNames(dto.locations ?? []);
		const profile = await this.userProfileService.getProfileByUserId(userId);

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
				: { selfDescribed: profile.selfDescribed })
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

	async findOneById(id: string, withProfile: boolean = false) {
		return this.userRepository.findOneById(id, withProfile);
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

	async finUsersFindFriend() {
		return this.userRepository.findUsersFindFriend();
	}

	async toggleFindingFriend(id: string) {
		return this.userRepository.toggleFindingFriend(id);
	}

	async removeUserFromAllPublicGroups(userId: string) {
		return this.userRepository.removeUserFromAllPublicGroups(userId);
	}

	async foundMatch(id: string) {
		await this.userProfileService.reduceStrangerConversationSlotByOne(id);
		await this.userRepository.toggleFindingFriend(id);
	}

	async reduceConversationSlot(id: string) {
		return this.userProfileService.reduceStrangerConversationSlotByOne(id);
	}

	async increaseConversationSlot(id: string) {
		return this.userProfileService.increaseStrangerConversationSlotByOne(id);
	}

	async getMyGroups(userId: string, query: GetMyGroupsDto) {
		return this.userRepository.getMyGroups(userId, query);
	}

	findAllUsers(query: GetUsersDto) {
		return this.userRepository.findAllUsers(query);
	}

	async changePassword(userId: string, dto: ChangePasswordDto) {
		return this.userRepository.changePassword(userId, dto);
	}
}
