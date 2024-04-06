import { Controller, Get, Post, Patch, Param, Query } from '@nestjs/common';
import { ReportTicketService } from './services/report-tiket.service';
import { AuthAdmin, GetCurrentUser } from 'src/common';
import { GetReportTicketsDto } from './dto';

@AuthAdmin()
@Controller('report-tiket/admin')
export class ReportTicketController {
	constructor(private readonly reportTiketService: ReportTicketService) {}

	@Get()
	getReportTikets(@Query() query: GetReportTicketsDto) {
		return this.reportTiketService.getReportTikets(query);
	}

	@Post(':id/accept')
	acceptReportTicket(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.reportTiketService.acceptReportTicket(id, user.userId.toString());
	}

	@Patch(':id/reject')
	async rejectReportTicket(@Param('id') id: string, @GetCurrentUser() user: TUserJwt) {
		return this.reportTiketService.rejectReportTicket(id, user.userId.toString());
	}
}
