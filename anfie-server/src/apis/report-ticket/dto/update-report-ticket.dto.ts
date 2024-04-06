import { PartialType } from '@nestjs/mapped-types';
import { CreateReportTicketDto } from './create-report-ticket.dto';

export class UpdateReportTicketDto extends PartialType(CreateReportTicketDto) {}
