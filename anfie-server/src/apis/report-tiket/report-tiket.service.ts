import { Injectable } from '@nestjs/common';
import { CreateReportTiketDto } from './dto/create-report-tiket.dto';
import { UpdateReportTiketDto } from './dto/update-report-tiket.dto';

@Injectable()
export class ReportTiketService {
  create(createReportTiketDto: CreateReportTiketDto) {
    return 'This action adds a new reportTiket';
  }

  findAll() {
    return `This action returns all reportTiket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportTiket`;
  }

  update(id: number, updateReportTiketDto: UpdateReportTiketDto) {
    return `This action updates a #${id} reportTiket`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportTiket`;
  }
}
