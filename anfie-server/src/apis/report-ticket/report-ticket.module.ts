import { Module } from '@nestjs/common';
import { ReportTicketService } from './services/report-ticket.service';
import { ReportTicketController } from './report-ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportTicket } from './entities';
import { ReportTicketRepository } from './repositories';
import { UserModule } from '../user/user.module';
import { ReportTicketAdminService } from './services';
import { ReportTicketAdminController } from './report-ticket.admin.controller';
import { MessageModule } from '../message/message.module';
import { PostModule } from '../post/post.module';
import { ConfessionsModule } from '../confessions/confessions.module';
import { CommentModule } from '../comment/comment.module';

@Module({
	controllers: [ReportTicketController, ReportTicketAdminController],
	providers: [ReportTicketService, ReportTicketRepository, ReportTicketAdminService],
	imports: [TypeOrmModule.forFeature([ReportTicket]), UserModule, MessageModule, PostModule, ConfessionsModule, CommentModule]
})
export class ReportTiketModule {}
