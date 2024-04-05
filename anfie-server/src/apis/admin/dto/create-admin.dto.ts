import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AdminUserType } from 'src/common';

export class CreateAdminDto {
	@IsString()
	name!: string;

	@IsString()
	username!: string;

	@IsString()
	@IsNotEmpty({
		message: 'Mật khẩu không được bỏ trống'
	})
	hash!: string;

	@IsArray()
	@IsString({ each: true })
	roles!: string[];

	@IsOptional()
	@IsEnum(AdminUserType)
	type?: AdminUserType;
}
