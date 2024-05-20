import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	content: string;

	@IsString()
	@IsOptional()
	groupId?: string;
}
