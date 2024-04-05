import { Module } from '@nestjs/common';
import { ReportTiketService } from './report-tiket.service';
import { ReportTiketController } from './report-tiket.controller';

@Module({
  controllers: [ReportTiketController],
  providers: [ReportTiketService],
})
export class ReportTiketModule {}
