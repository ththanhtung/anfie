import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

export class GetConfestionsDto extends PaginationDto {
	@IsOptional()
	@IsString()
	tagIds?: string;
}
