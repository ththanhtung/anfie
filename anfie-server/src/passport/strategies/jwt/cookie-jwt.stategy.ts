import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CookieJwtStrategy extends PassportStrategy(Strategy, 'cookie-jwt') {
	constructor(config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([CookieJwtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
			ignoreExpiration: false,
			secretOrKey: config.get<string>('SECRET_JWT')
		});
	}

	private static extractJWT(req: Request): string | null {
		if (req.cookies && 'jwt' in req.cookies && req.cookies.jwt.length > 0) {
			return req.cookies.jwt;
		}
		throw new UnauthorizedException();
	}

	validate(payload: TUserJwt) {
		return payload;
	}
}
