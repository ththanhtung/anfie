import { IsString } from 'class-validator';

export class AddGroupRecipientDto {
	@IsString()
	userId;
}
