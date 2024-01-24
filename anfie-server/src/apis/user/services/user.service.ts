import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createOne(dto: CreateUserDto) {
		return this.userRepository.createOne(dto);
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
}
