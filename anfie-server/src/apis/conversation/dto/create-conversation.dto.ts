import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	recipientId!: number;
}
