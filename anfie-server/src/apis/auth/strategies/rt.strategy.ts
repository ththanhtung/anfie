import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
	constructor(config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
			secretOrKey: config.get<string>('SECRET_JWT'),
			passReqToCallback: true
		});
	}

	validate(req: Request, payload: TUserJwt) {
		const refreshToken = req.body.refreshToken.replace('Bearer ', '');

		if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

		return {
			...payload,
			refreshToken
		};
	}
}
