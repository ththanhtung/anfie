import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminService } from 'src/apis/admin/services';
import { TAdminJwt } from 'src/common/@types/admin';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
	constructor(
		config: ConfigService,
		private readonly adminService: AdminService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get<string>('SECRET_JWT')
		});
	}

	async validate(payload: TAdminJwt) {
		const admin = await this.adminService.getDetail(payload.adminId);
		if (!admin) {
			throw new UnauthorizedException();
		}
		return admin;
	}
}
