import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EReportTicketStatus, PaginationDto } from 'src/common';

export class GetReportTicketsDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EReportTicketStatus)
	status: EReportTicketStatus;
}

export class GetReportTicketsAdminDto extends PaginationDto {
	@IsOptional()
	@IsString({ each: true })
	status: string;

	@IsOptional()
	@IsString()
	reporteeEmail: string;

	@IsOptional()
	@IsString()
	reporterEmail: string;

	@IsOptional()
	@IsString()
	ticketId: string;
}
