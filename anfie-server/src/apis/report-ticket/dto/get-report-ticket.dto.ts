import { IsEnum, IsOptional } from 'class-validator';
import { EReportTicketStatus, PaginationDto } from 'src/common';

export class GetReportTicketsDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EReportTicketStatus)
	status: EReportTicketStatus;
}

export class GetReportTicketsAdminDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EReportTicketStatus)
	status: EReportTicketStatus;
}
