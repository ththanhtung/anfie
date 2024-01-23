import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos';
import { UserService } from 'src/apis/user/services';
import * as argon from 'argon2';
import { getTokens } from 'src/common/helpers';
import { Users } from 'src/apis/user/entities';

@Injectable()
export class AuthService {
	constructor(private readonly userServices: UserService) {}

	async register() {
		return true;
	}

	async login(dto: LoginDto) {
		const user = await this.userServices.findOneByEmail(dto.email);

		const comparePassword = await argon.verify(user.hash, dto.password);

		if (!comparePassword) {
			throw new BadRequestException([
				{
					field: 'password',
					message: 'wrong password'
				}
			]);
		}

		const { accessToken, refreshToken } = await getTokens(user.id, user.email);

		return { accessToken, refreshToken };
	}

	async logout() {
		return true;
	}

	async refreshToken(user: Users) {
		const { accessToken, refreshToken } = await getTokens(user.id, user.email);

		await this.userServices.updateRefreshToken(user.id, refreshToken);

		return { accessToken, refreshToken };
	}

	async me() {
		return true;
	}

	async changePassword() {
		return true;
	}

	async forgotPassword() {
		return true;
	}
}
