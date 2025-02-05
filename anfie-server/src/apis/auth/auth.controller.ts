import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './services';
import { LoginDto } from './dtos';
import { CookieJwtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { Request, Response } from 'express';
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
	async refreshToken(@GetCurrentUser() user: TUserJwt, @Req() res: Request) {
		return this.authService.refreshToken(user, res);
	}
}
