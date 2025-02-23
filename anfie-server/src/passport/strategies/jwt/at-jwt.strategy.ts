import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'at-jwt') {
	constructor(
		config: ConfigService,
		private readonly userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get<string>('SECRET_JWT')
		});
	}

	async validate(payload: TUserJwt) {
		const user = await this.userService.findOneByEmail(payload.email);

		const isBanned = user.profile.isBanned;

		if (isBanned) {
			throw new BadRequestException([
				{
					message: 'user is banned'
				}
			]);
		}

		return payload;
	}
}
