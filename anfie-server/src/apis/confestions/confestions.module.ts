import { Module } from '@nestjs/common';
import { ConfestionsService } from './confestions.service';
import { ConfestionsController } from './confestions.controller';

@Module({
  controllers: [ConfestionsController],
  providers: [ConfestionsService],
})
export class ConfestionsModule {}
