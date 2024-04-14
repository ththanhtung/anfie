import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

export class GetCommentsDto extends PaginationDto {
	@IsOptional()
	@IsString()
	postId: string;
}
