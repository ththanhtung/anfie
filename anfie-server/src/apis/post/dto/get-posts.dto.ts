import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

export class GetPostsDto extends PaginationDto {}

export class GetPostsAdminDto extends PaginationDto {
	@IsString()
	@IsOptional()
	userId: string;
}
