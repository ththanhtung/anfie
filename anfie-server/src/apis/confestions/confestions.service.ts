import { Injectable } from '@nestjs/common';
import { CreateConfestionDto } from './dto/create-confestion.dto';
import { UpdateConfestionDto } from './dto/update-confestion.dto';

@Injectable()
export class ConfestionsService {
  create(createConfestionDto: CreateConfestionDto) {
    return 'This action adds a new confestion';
  }

  findAll() {
    return `This action returns all confestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confestion`;
  }

  update(id: number, updateConfestionDto: UpdateConfestionDto) {
    return `This action updates a #${id} confestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} confestion`;
  }
}
