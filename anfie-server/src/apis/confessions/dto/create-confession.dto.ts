import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConfestionDto {
	@IsString()
	@IsNotEmpty()
	content: string;
}
