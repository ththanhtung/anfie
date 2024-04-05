import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
	@IsString()
	username!: string;

	@IsString()
	@IsNotEmpty({
		message: 'Mật khẩu không được bỏ trống'
	})
	password!: string;
}
