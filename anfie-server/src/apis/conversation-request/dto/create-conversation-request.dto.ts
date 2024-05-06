import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationRequestDto {
	@IsString()
	@IsNotEmpty()
	firstUserId: string;

	@IsString()
	@IsNotEmpty()
	secondUserId: string;
}
