import { Module } from '@nestjs/common';
import { PostMediaService } from './services/post-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaUploaderModule } from '../media-uploader/media-uploader.module';
import { PostMediaRepository } from './repositories';
import { PostMedia } from './entities';

@Module({
	imports: [TypeOrmModule.forFeature([PostMedia]), MediaUploaderModule],
	providers: [PostMediaService, PostMediaRepository],
	exports: [PostMediaService]
})
export class PostMediaModule {}
