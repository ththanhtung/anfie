import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportTicketDto {
	@IsString()
	@IsNotEmpty()
	reportedId: string;

	@IsString()
	content: string;

	@IsString()
	type: TReportTicketType;
}
