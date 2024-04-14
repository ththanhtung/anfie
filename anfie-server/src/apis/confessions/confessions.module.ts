import { Module } from '@nestjs/common';
import { ConfessionsService } from './services/confessions.service';
import { ConfessionsController } from './confessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Confession } from './entities';
import { ConfessionRepository } from './repositories';

@Module({
	controllers: [ConfessionsController],
	providers: [ConfessionsService, ConfessionRepository],
	imports: [TypeOrmModule.forFeature([Confession])],
	exports: [ConfessionsService]
})
export class ConfessionsModule {}
