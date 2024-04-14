import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageRequestDto {
	@IsString()
	@IsNotEmpty()
	content: string;

	@IsString()
	@IsNotEmpty()
	confessionId: string;
}
