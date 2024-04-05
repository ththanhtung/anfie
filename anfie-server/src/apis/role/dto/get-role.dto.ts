import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/utils/pagination.dto';

export class GetRoleQueryDto extends PaginationDto {
	@IsString()
	@IsOptional()
	name?: string;
}
