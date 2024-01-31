import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { OrderBy } from '../enums';

export class PaginationDto {
	@IsOptional()
	@IsNumberString()
	limit!: string;

	@IsOptional()
	@IsNumberString()
	page!: string;

	@IsOptional()
	@IsString()
	order_by!: string;

	@IsOptional()
	@IsEnum(OrderBy)
	sort!: OrderBy;
}
