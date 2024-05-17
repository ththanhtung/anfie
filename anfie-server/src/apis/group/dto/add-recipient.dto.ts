import { IsNotEmpty, IsString } from 'class-validator';

export class AddRecipientDto {
	@IsString({
		each: true
	})
	@IsNotEmpty()
	recipientIds: string[];
}
