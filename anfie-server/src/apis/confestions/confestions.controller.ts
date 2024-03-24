import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfestionsService } from './confestions.service';
import { CreateConfestionDto } from './dto/create-confestion.dto';
import { UpdateConfestionDto } from './dto/update-confestion.dto';

@Controller('confestions')
export class ConfestionsController {
  constructor(private readonly confestionsService: ConfestionsService) {}

  @Post()
  create(@Body() createConfestionDto: CreateConfestionDto) {
    return this.confestionsService.create(createConfestionDto);
  }

  @Get()
  findAll() {
    return this.confestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfestionDto: UpdateConfestionDto) {
    return this.confestionsService.update(+id, updateConfestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.confestionsService.remove(+id);
  }
}
