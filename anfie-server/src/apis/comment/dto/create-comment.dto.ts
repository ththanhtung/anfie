import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
	@IsString()
	postId: string;

	@IsString()
	content: string;

	@IsString()
	@IsOptional()
	parentId: string;
}
