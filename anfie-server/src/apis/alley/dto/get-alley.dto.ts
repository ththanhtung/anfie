import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

export class GetAlleysDto extends PaginationDto {
	@IsOptional()
	@IsString()
	postId: string;
}
