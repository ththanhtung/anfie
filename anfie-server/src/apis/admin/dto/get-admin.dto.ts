import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/utils/pagination.dto';

export class GetAdminQueryDto extends PaginationDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	username?: string;
}
