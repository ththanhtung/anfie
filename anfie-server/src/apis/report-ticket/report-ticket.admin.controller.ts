import { Controller, Get, Post, Patch, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthAdmin, GetCurrentUser } from 'src/common';
import { GetReportTicketsAdminDto } from './dto';
import { ReportTicketAdminService } from './services';

@AuthAdmin()
@Controller('report-ticket/admin')
export class ReportTicketAdminController {
	constructor(private readonly reportTiketAdminService: ReportTicketAdminService) {}

	@Get()
	async getReportTikets(@Query() query: GetReportTicketsAdminDto) {
		return this.reportTiketAdminService.getReportTikets(query);
	}

	@Patch(':id/accept')
	@HttpCode(HttpStatus.OK)
	async acceptReportTicket(@Param('id') id: string, @GetCurrentUser('id') adminId: string) {
		return this.reportTiketAdminService.acceptReportTicket(id, adminId);
	}

	@Patch(':id/reject')
	async rejectReportTicket(@Param('id') id: string, @GetCurrentUser('id') adminId: string) {
		return this.reportTiketAdminService.rejectReportTicket(id, adminId);
	}

	@Get(':id')
	async getOneById(@Param('id') id: string) {
		return this.reportTiketAdminService.findOneById(id);
	}
}
