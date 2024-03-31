import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageRequestDto {
	@IsString()
	@IsNotEmpty()
	receiverId: string;

	@IsString()
	@IsNotEmpty()
	content: string;

	@IsString()
	@IsNotEmpty()
	confessionId: string;
}
