import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class SignupDto {
	@IsString()
	email: string;

	@IsString()
	hash: string;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsDateString()
	dob: Date;

	@IsString()
	gender: string;

	@IsString()
	phone: string;

	@IsArray()
	@IsOptional()
	preferences: string[];

	@IsArray()
	@IsOptional()
	locations: string[];

	@IsArray()
	@IsOptional()
	preferGenders: string[];

	@IsArray()
	@IsOptional()
	bio: string;
}
