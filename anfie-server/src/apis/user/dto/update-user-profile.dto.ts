import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProfileDto } from './create-user-profile.dto';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
	@IsArray()
	@IsOptional()
	preferences: string[];

	@IsArray()
	@IsOptional()
	selfDescribed: string[];

	@IsArray()
	@IsOptional()
	locations: string[];

	@IsArray()
	@IsOptional()
	preferGenders: string[];
}

export class AdminUpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
	@IsString()
	id: string;

	@IsArray()
	@IsOptional()
	preferences: string[];

	@IsArray()
	@IsOptional()
	selfDescribed: string[];

	@IsArray()
	@IsOptional()
	locations: string[];

	@IsArray()
	@IsOptional()
	preferGenders: string[];

	@IsBoolean()
	@IsOptional()
	isBanned: boolean;
}
