import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePreferGenderDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}
