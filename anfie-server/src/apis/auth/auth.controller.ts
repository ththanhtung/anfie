import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './services';
import { ChangePasswordDto, LoginDto } from './dtos';
import { CookieJwtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { Response } from 'express';
import { SignupDto } from './dtos/signup.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@UseInterceptors(FilesInterceptor('medias'))
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() dto: SignupDto, @UploadedFiles() medias: Express.Multer.File[]) {
		return this.authService.register({ ...dto, medias });
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.login(dto, res);
	}

	@UseGuards(CookieJwtGuard)
	@Post('refresh-token')
	@HttpCode(HttpStatus.OK)
	async refreshToken(@GetCurrentUser() user: TUserJwt) {
		return this.authService.refreshToken(user);
	}

	@Patch('change-password')
	@UseGuards(CookieJwtGuard)
	@HttpCode(HttpStatus.OK)
	async changePassword(@GetCurrentUser() user: TUserJwt, @Body() dto: ChangePasswordDto) {
		return this.authService.changePassword(user, dto);
	}
}
