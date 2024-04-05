import { Controller, Post, Body, HttpCode, HttpStatus, Res, UseGuards, Get, Req } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { CreateAdminDto, LoginAdminDto } from './dto';
import { Response, Request } from 'express';
import { CookieJwtGuard, GetCurrentUser } from 'src/common';
import { TAdminJwt } from 'src/common/@types/admin';

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() dto: CreateAdminDto) {
		return this.adminService.create(dto);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginAdminDto, @Res({ passthrough: true }) res: Response) {
		return this.adminService.login(dto, res);
	}

	@UseGuards(CookieJwtGuard)
	@Get('refresh_token')
	@HttpCode(HttpStatus.OK)
	async refreshToken(@GetCurrentUser() admin: TAdminJwt, @Req() res: Request) {
		return this.adminService.refreshToken(admin, res);
	}
}
