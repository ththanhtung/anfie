import { Module } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities';
import { TagRepository } from './repositories';
import { TagAdminService } from './services';
import { TagAdminController } from './tag.admin.controller';

@Module({
	controllers: [TagController, TagAdminController],
	providers: [TagService, TagRepository, TagAdminService],
	imports: [TypeOrmModule.forFeature([Tag])],
	exports: [TagService]
})
export class TagModule {}
