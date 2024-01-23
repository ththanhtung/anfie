import { IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	email!: string;

	@IsString()
	hash!: string;

	@IsString()
	description: string;
}
