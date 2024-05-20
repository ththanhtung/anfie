import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { AdminRepository } from '../repositories';
import { LoginAdminDto } from '../dto';
import { RoleService } from 'src/apis/role/services';
import { Role } from 'src/apis/role/entities';
import * as argon from 'argon2';
import { JwtHelper, getTokens } from 'src/common';
import { Response, Request } from 'express';
import { TAdminJwt } from 'src/common/@types/admin';

@Injectable()
export class AdminService {
	constructor(
		private readonly adminRepository: AdminRepository,
		private readonly roleService: RoleService
	) {}

	async create(dto: CreateAdminDto) {
		await this.adminRepository.checkExist(dto.username);

		const roles: Role[] = [];
		for (let i = 0; i < dto.roles.length; i++) {
			const role_name = dto.roles[i];
			const role = await this.roleService.getDetailName(role_name);
			roles.push(role);
		}
		return this.adminRepository.createOne({ ...dto, roles: roles });
	}

	async login(dto: LoginAdminDto, res: Response) {
		const admin = await this.adminRepository.findOneByUsername(dto.username);

		const comparePassword = await argon.verify(admin.hash, dto.password);

		if (!comparePassword) {
			throw new BadRequestException([
				{
					field: 'password',
					message: 'wrong password'
				}
			]);
		}

		const { accessToken, refreshToken } = await getTokens({
			adminId: admin.id,
			username: admin.username,
			roles: admin.roles.map((role) => role.name)
		});

		this.adminRepository.updateAccessToken(admin.id, accessToken);

		res.cookie('jwt', refreshToken, {
			maxAge: 24 * 3 * 60 * 60 * 1000,
			sameSite: 'none',
			secure: true
		});

		return {
			admin,
			tokens: { accessToken }
		};
	}

	async logout(user_id: string) {
		this.adminRepository.updateAccessToken(user_id, undefined);
	}

	async remove(user_id: string) {
		return this.adminRepository.removeById(user_id);
	}

	async refreshToken(admin: TAdminJwt, req: Request) {
		const refreshTokenFromCoookie = req.cookies?.jwt;

		const userFromCookie = JwtHelper.verify(refreshTokenFromCoookie);
		if (userFromCookie?.id !== admin?.adminId) {
			throw new ForbiddenException([
				{
					message: 'forbidden error'
				}
			]);
		}

		const { accessToken, refreshToken } = await getTokens({
			adminId: admin.adminId,
			username: admin.username,
			roles: admin.roles
		});

		return { accessToken, refreshToken };
	}

	async getDetail(id: string) {
		return this.adminRepository.findOneOrFail({ where: { id } });
	}
}
