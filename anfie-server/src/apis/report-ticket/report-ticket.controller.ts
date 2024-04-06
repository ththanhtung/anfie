import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ReportTicketService } from './services/report-tiket.service';
import { CreateReportTicketDto } from './dto/create-report-ticket.dto';
import { GetCurrentUser } from 'src/common';
import { GetReportTicketsDto } from './dto';

@Controller('report-tiket')
export class ReportTicketController {
	constructor(private readonly reportTiketService: ReportTicketService) {}

	@Post()
	async createReportTicket(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateReportTicketDto) {
		return this.reportTiketService.createOne(user, dto);
	}

	@Get()
	getReportTiketsByUserId(@GetCurrentUser() user: TUserJwt, @Query() query: GetReportTicketsDto) {
		return this.reportTiketService.getReportTiketsByUserId(user, query);
	}

	@Delete(':id/cancel')
	async cancelReportTicket(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.reportTiketService.cancelReportTicket(id, user.userId.toString());
	}
}
