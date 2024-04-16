import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
	@IsNotEmpty()
	@IsString()
	user1!: string;

	@IsNotEmpty()
	@IsString()
	user2!: string;
}
