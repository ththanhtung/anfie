import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProfileDto } from './create-user-profile.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
	@IsArray()
	@IsOptional()
	preferences: string[];

	@IsArray()
	@IsOptional()
	locations: string[];

	@IsArray()
	@IsOptional()
	preferGenders: string[];
}
