import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Genders } from 'src/common';

export class CreateUserProfileDto {
	@IsString()
	userId: string;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsDateString()
	dob: Date;

	@IsEnum(Genders)
	gender: string;

	@IsString()
	phone: string;

	@IsString()
	@IsOptional()
	bio?: string;
}
