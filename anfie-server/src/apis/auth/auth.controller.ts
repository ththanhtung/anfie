import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './services';
import { LoginDto } from './dtos';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { Users } from '../user/entities';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('login')
	async login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}

	@UseGuards(RtGuard)
	@Get('refresh_token')
	@HttpCode(HttpStatus.OK)
	async refreshToken(@GetCurrentUser() user: Users) {
		return this.authService.refreshToken(user);
	}
}
