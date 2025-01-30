/* eslint-disable prettier/prettier */
import { Between, ILike, In, Repository } from 'typeorm';
import { Users } from '../entities';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, GetMyGroupsDto, GetUsersDto } from '../dto';
import { EGroupType, pagination } from 'src/common';

@Injectable()
export class UserRepository extends Repository<Users> {
	constructor(@InjectRepository(Users) repository: Repository<Users>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async checkExist(email: string) {
		const user = await this.findOne({ where: { email: email } });
		if (user) {
			throw new ConflictException([
				{
					field: 'email',
					message: 'Email already exist'
				}
			]);
		}
	}

	async findOneByEmail(email: string) {
		const user = await this.findOne({ where: { email: email } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'email',
					message: 'user not found'
				}
			]);
		}
		return user;
	}

	async findOneById(id: string) {
		const user = await this.findOne({ where: { id: id } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'id',
					message: 'user not found'
				}
			]);
		}
		return user;
	}

	async createOne(input: CreateUserDto) {
		await this.checkExist(input.email);
		const user = this.create(input);
		return this.save(user);
	}

	async updateRefreshToken(userId: string, refreshToken: string | null) {
		const user = await this.findOne({ where: { id: userId } });
		user.refreshToken = refreshToken;
		return this.save(user);
	}

	async findOneByRefreshToken(refreshToken: string) {
		const user = await this.findOne({ where: { refreshToken: refreshToken } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'refreshToken',
					message: 'user not found'
				}
			]);
		}
		return user;
	}
	async updateAccessToken(userId: string, accessToken: string | null) {
		const user = await this.findOne({ where: { id: userId } });
		user.accessToken = accessToken;
		return this.save(user);
	}

	async findOneByAccessToken(accessToken: string) {
		const user = await this.findOne({ where: { accessToken: accessToken } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'accessToken',
					message: 'user not found'
				}
			]);
		}
		return user;
	}

	async findUsersByIds(ids: string[]) {
		return this.find({ where: { id: In(ids) } });
	}

	async updateUserInfo(user: { id: string; firstName?: string; lastName?: string; dob?: Date; profilePictureUrl?: string }) {
		await this.update(
			{ id: user.id },
			{
				firstName: user.firstName,
				lastName: user.lastName,
				dob: user.dob,
				profilePictureUrl: user.profilePictureUrl
			}
		);

		return this.findOne({
			where: {
				id: user.id
			}
		});
	}

	async findUsersFindFriend() {
		const user = await this.find({ where: { isFindFriend: true } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'accessToken',
					message: 'user not found'
				}
			]);
		}
		return user;
	}

	async toggleFindingFriend(id: string) {
		const user = await this.findOne({ where: { id: id } });
		if (!user) {
			throw new NotFoundException([
				{
					message: 'user not found'
				}
			]);
		}
		await this.update({ id: id }, { isFindFriend: !user.isFindFriend });
	}

	async removeUserFromAllPublicGroups(userId: string) {
		const user = await this.findOne({
			where: { id: userId },
			relations: ['groups']
		});

		if (!user) {
			throw new NotFoundException([
				{
					message: 'user not found'
				}
			]);
		}
		// Lọc chỉ giữ lại các nhóm private
		user.groups = user.groups.filter((group) => group.type !== EGroupType.PUBLIC);

		// Lưu lại để cập nhật các liên kết
		return this.save(user);
	}

	async getMyGroups(id: string, query: GetMyGroupsDto) {
		const user = await this.findOne({ where: { id: id } });

		if (!user) {
			throw new NotFoundException([
				{
					message: 'user not found'
				}
			]);
		}

		return pagination(this, query, {
			where: {
				id
			},
			relations: ['groups']
		});
	}

	async findAllUsers(query: GetUsersDto) {
		const {
			firstname,
			lastname,
			ageRange: ageRangeString,
			gender: genderString,
			preferences: preferencesString,
			isBanned: isBannedString,
			location: locationString
		} = query;

		const preferences = JSON.parse(preferencesString === undefined ? '[]' : preferencesString === '' ? '[]' : preferencesString);
		const gender = genderString ? JSON.parse(genderString) : [];
		const isBanned = isBannedString ? JSON.parse(isBannedString) : [];
		const location = locationString ? JSON.parse(locationString) : [];

		const [ageMin, ageMax] = ageRangeString ? JSON.parse(ageRangeString) : [undefined, undefined];

		// Remove extra spaces and split the full name into searchable parts
		const firstnameParts = firstname?.trim().split(/\s+/);
		const lastnameParts = lastname?.trim().split(/\s+/);

		const filter = {
			relations: ['profile'],
			where: {
				...(firstname && { firstName: ILike(`%${firstnameParts.join('%')}%`) }),
				...(lastname && { lastName: ILike(`%${lastnameParts.join('%')}%`) }),
				profile: {
					...(gender.length > 0 && { gender: In(gender) }),
					...(location.length > 0 && { userLocation: In(location)}),
					...(isBanned.length > 0 && { isBanned: In(isBanned) }),
					...(preferences.length > 0 && { preferences: { name: In(preferences) } })
				},
				...(ageMin &&
					ageMax && {
						dob: Between(
							new Date(new Date().getFullYear() - ageMax, new Date().getMonth(), new Date().getDate()),
							new Date(new Date().getFullYear() - ageMin, new Date().getMonth(), new Date().getDate())
						)
					})
			}
		};

		return pagination(this, query, filter);
	}
}
