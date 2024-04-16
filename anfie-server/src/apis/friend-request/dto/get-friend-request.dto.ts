import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

export class GetFriendRequestsDto extends PaginationDto {}

export class GetFriendRequestsAdminDto extends PaginationDto {
	@IsString()
	@IsOptional()
	userId: string;
}
