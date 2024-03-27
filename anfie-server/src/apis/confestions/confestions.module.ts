import { Module } from '@nestjs/common';
import { ConfestionsService } from './services/confestions.service';
import { ConfestionsController } from './confestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Confestion } from './entities';

@Module({
	controllers: [ConfestionsController],
	providers: [ConfestionsService],
	imports: [TypeOrmModule.forFeature([Confestion])]
})
export class ConfestionsModule {}
