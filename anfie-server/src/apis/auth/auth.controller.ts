import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './services';
import { LoginDto } from './dtos';
import { CookieJwtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { Request, Response } from 'express';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() dto: SignupDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.login(dto, res);
	}

	@UseGuards(CookieJwtGuard)
	@Get('refresh_token')
	@HttpCode(HttpStatus.OK)
	async refreshToken(@GetCurrentUser() user: TUserJwt, @Req() res: Request) {
		return this.authService.refreshToken(user, res);
	}
}
