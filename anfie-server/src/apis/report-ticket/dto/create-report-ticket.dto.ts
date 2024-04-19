import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EReportTicketType } from 'src/common/enums/reportTicket';

export class CreateReportTicketDto {
	@IsString()
	@IsOptional()
	postId: string;

	@IsString()
	@IsOptional()
	confessionId: string;

	@IsString()
	@IsOptional()
	commentId: string;

	@IsString({ each: true })
	@IsOptional()
	messageIds: string[];

	@IsString()
	@IsNotEmpty()
	reporteeId: string;

	@IsString()
	content: string;

	@IsEnum(EReportTicketType)
	type: EReportTicketType;
}
