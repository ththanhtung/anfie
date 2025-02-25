import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateUserProfileDto {
	@IsString()
	userId: string;

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
	bio?: string;
}
