import { PartialType } from '@nestjs/mapped-types';
import { CreateReportTiketDto } from './create-report-tiket.dto';

export class UpdateReportTiketDto extends PartialType(CreateReportTiketDto) {}
