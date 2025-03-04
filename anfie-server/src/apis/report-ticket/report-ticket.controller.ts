import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ReportTicketService } from './services/report-ticket.service';
import { CreateReportTicketDto } from './dto/create-report-ticket.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetReportTicketsDto } from './dto';

@UseGuards(AtGuard)
@Controller('report-ticket')
export class ReportTicketController {
	constructor(private readonly reportTiketService: ReportTicketService) {}

	@Post()
	async createReportTicket(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateReportTicketDto) {
		return this.reportTiketService.createOne(user, dto);
	}

	@Get()
	async getReportTiketsByUserId(@GetCurrentUser() user: TUserJwt, @Query() query: GetReportTicketsDto) {
		return this.reportTiketService.getReportTiketsByUserId(user, query);
	}

	@Delete(':id/cancel')
	async cancelReportTicket(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
		return this.reportTiketService.cancelReportTicket(id, userId);
	}
}
