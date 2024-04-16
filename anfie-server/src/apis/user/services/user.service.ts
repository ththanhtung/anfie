import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserDto } from '../dto';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userProfileService: UserProfileService
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

		const profile = await this.userProfileService.createOne({ userId: user.id.toString(), ...dto });

		return {
			...user,
			...profile
		};
	}

	async checkExist(email: string) {
		return await this.userRepository.checkExist(email);
	}

	async findOneByEmail(email: string) {
		return this.userRepository.findOneByEmail(email);
	}

	async findOneById(id: number) {
		return this.userRepository.findOneById(id);
	}

	async updateRefreshToken(userId: number, refreshToken: string | null) {
		return this.userRepository.updateRefreshToken(userId, refreshToken);
	}

	async findOneByRefreshToken(refreshToken: string) {
		return this.userRepository.findOneByRefreshToken(refreshToken);
	}

	async findUsersByIds(ids: string[]) {
		return this.userRepository.findUsersByIds(ids);
	}
}
