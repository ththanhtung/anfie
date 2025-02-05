import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos';
import { UserService } from 'src/apis/user/services';
import * as argon from 'argon2';
import { getTokens } from 'src/common/helpers';
import { Request, Response } from 'express';
import { SignupDto } from '../dtos/signup.dto';
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

		return {
			user,
			tokens: { accessToken }
		};
	}

	async logout() {
		return true;
	}

	async refreshToken(user: TUserJwt, req: Request) {
		const refreshTokenFromCoookie = req.cookies?.jwt;
		console.log({ refreshTokenFromCoookie });

		const { accessToken, refreshToken } = await getTokens({ userId: user.userId, email: user.email });

		await this.userServices.updateAccessToken(user.userId, refreshToken);

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
