import { Module } from '@nestjs/common';
import { ReportTicketService } from './services/report-tiket.service';
import { ReportTicketController } from './report-ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportTicket } from './entities';
import { ReportTicketRepository } from './repositories';
import { UserModule } from '../user/user.module';
import { ReportTicketAdminService } from './services';
import { ReportTicketAdminController } from './report-ticket.admin.controller';

@Module({
	controllers: [ReportTicketController, ReportTicketAdminController],
	providers: [ReportTicketService, ReportTicketRepository, ReportTicketAdminService],
	imports: [TypeOrmModule.forFeature([ReportTicket]), UserModule]
})
export class ReportTiketModule {}
