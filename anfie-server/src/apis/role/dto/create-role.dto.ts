import { IsArray, IsEnum, IsString } from 'class-validator';
import { Permission } from 'src/common';

export class CreateRoleDto {
	@IsString()
	name!: string;

	@IsArray()
	@IsEnum(Permission, { each: true })
	permissions!: Permission[];

	@IsString()
	description?: string;
}
