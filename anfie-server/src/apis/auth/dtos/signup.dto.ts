import { IsDateString, IsOptional, IsString } from 'class-validator';

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

	@IsString()
	@IsOptional()
	preferences: string;

	@IsString()
	@IsOptional()
	selfDescribed: string;

	@IsString()
	@IsOptional()
	locations: string;

	@IsString()
	@IsOptional()
	preferGenders: string;

	@IsString()
	@IsOptional()
	bio: string;
}
