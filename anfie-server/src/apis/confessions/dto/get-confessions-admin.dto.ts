import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

export class GetConfessionsAdminDto extends PaginationDto {
	@IsString()
	@IsOptional()
	userId?: string;

	@IsString()
	@IsOptional()
	tag?: string;
}
