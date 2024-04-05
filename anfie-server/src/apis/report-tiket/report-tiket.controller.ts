import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportTiketService } from './report-tiket.service';
import { CreateReportTiketDto } from './dto/create-report-tiket.dto';
import { UpdateReportTiketDto } from './dto/update-report-tiket.dto';

@Controller('report-tiket')
export class ReportTiketController {
  constructor(private readonly reportTiketService: ReportTiketService) {}

  @Post()
  create(@Body() createReportTiketDto: CreateReportTiketDto) {
    return this.reportTiketService.create(createReportTiketDto);
  }

  @Get()
  findAll() {
    return this.reportTiketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportTiketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportTiketDto: UpdateReportTiketDto) {
    return this.reportTiketService.update(+id, updateReportTiketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportTiketService.remove(+id);
  }
}
