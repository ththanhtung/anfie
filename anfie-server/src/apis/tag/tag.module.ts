import { Module } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities';
import { TagRepository } from './repositories';

@Module({
	controllers: [TagController],
	providers: [TagService, TagRepository],
	imports: [TypeOrmModule.forFeature([Tag])],
	exports: [TagService]
})
export class TagModule {}
