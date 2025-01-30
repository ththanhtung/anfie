import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

export class GetMyGroupsDto extends PaginationDto {}

export class GetUsersDto extends PaginationDto {
	@IsString()
	@IsOptional()
	ageRange?: string;

	@IsString()
	@IsOptional()
	firstname?: string;

	@IsString()
	@IsOptional()
	lastname?: string;

	@IsString({ each: true })
	@IsOptional()
	isBanned?: string;

	@IsString({
		each: true
	})
	@IsOptional()
	gender?: string;

	@IsString({
		each: true
	})
	@IsOptional()
	preferences?: string;

	@IsString({
		each: true
	})
	@IsOptional()
	location?: string;
}
