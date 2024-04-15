import { IsDateString, IsEnum, IsString } from 'class-validator';
import { Genders } from 'src/common';

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

	@IsEnum(Genders)
	gender: Genders;

	@IsString()
	phone: string;

	@IsString()
	bio: string;
}
