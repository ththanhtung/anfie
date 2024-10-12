import { ArrayNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { EGroupType } from 'src/common';

export class CreateGroupDto {
	@IsString({ each: true })
	@ArrayNotEmpty()
	users: string[];

	@IsString()
	title: string;

	@IsEnum(EGroupType)
	@IsOptional()
	type?: EGroupType;
}

export class CreateGroupAdminDto {
	@IsString({ each: true })
	@ArrayNotEmpty()
	users: string[];

	@IsString()
	title: string;

	@IsString()
	creatorId: string;

	@IsString()
	adminId: string;
}
