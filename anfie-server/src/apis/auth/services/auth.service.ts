import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangePasswordDto, LoginDto } from '../dtos';
import { UserService } from 'src/apis/user/services';
import * as argon from 'argon2';
import { getTokens } from 'src/common/helpers';
import { Response } from 'express';
import { ProfileMediaService } from 'src/apis/profile-media/profile-media.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userServices: UserService,
		private readonly profileMediaService: ProfileMediaService
	) {}

	async register(dto: TSignupParams) {
		const newUser = await this.userServices.createOne(dto);

		await this.profileMediaService.create(newUser.profile.id, dto.medias);

		const userWithMedias = await this.userServices.findOneById(newUser.id, true);

		return userWithMedias;
	}

	async login(dto: LoginDto, res: Response) {
		const user = await this.userServices.findOneByEmail(dto.email);

		const isBanned = user.profile.isBanned;

		if (isBanned) {
			throw new BadRequestException([
				{
					message: 'user is banned'
				}
			]);
		}

		const comparePassword = await argon.verify(user.hash, dto.password);

		if (!comparePassword) {
			throw new BadRequestException([
				{
					field: 'password',
					message: 'wrong password'
				}
			]);
		}

		const { accessToken, refreshToken } = await getTokens({ userId: user.id, email: user.email });

		this.userServices.updateAccessToken(user.id, refreshToken);

		res.cookie('jwt', refreshToken, {
			maxAge: 24 * 3 * 60 * 60 * 1000,
			sameSite: 'none',
			secure: true
		});

		delete user.profile;

		return {
			user,
			tokens: { accessToken }
		};
	}

	async logout() {
		return true;
	}

	async refreshToken(user: TUserJwt) {
		// const refreshTokenFromCoookie = req.cookies?.jwt;
		// console.log({ refreshTokenFromCoookie });

		const { accessToken, refreshToken } = await getTokens({ userId: user.userId, email: user.email });

		await this.userServices.updateAccessToken(user.userId, refreshToken);

		return { accessToken, refreshToken };
	}

	async me() {
		return true;
	}

	async changePassword(user: TUserJwt, dto: ChangePasswordDto) {
		return this.userServices.changePassword(user.userId, dto);
	}

	async forgotPassword() {
		return true;
	}
}
