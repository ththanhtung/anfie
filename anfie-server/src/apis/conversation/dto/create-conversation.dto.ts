import { IsString } from 'class-validator';

export class CreateConversationDto {
	@IsString({ each: true })
	userIds: string;
}
