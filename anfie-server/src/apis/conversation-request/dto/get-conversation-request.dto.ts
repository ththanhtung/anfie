import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

export class GetConversationRequestsDto extends PaginationDto {}

export class GetConversationRequestsAdminDto extends PaginationDto {
	@IsString()
	@IsOptional()
	userId: string;
}
