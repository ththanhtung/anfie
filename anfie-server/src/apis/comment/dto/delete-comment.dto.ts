import { IsString } from 'class-validator';

export class DeleteCommentDto {
	@IsString()
	postId: string;
}
