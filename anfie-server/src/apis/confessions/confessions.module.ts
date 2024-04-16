import { Module } from '@nestjs/common';
import { ConfessionsService } from './services/confessions.service';
import { ConfessionsController } from './confessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Confession } from './entities';
import { ConfessionRepository } from './repositories';
import { TagModule } from '../tag/tag.module';

@Module({
	controllers: [ConfessionsController],
	providers: [ConfessionsService, ConfessionRepository],
	imports: [TypeOrmModule.forFeature([Confession]), TagModule],
	exports: [ConfessionsService]
})
export class ConfessionsModule {}
