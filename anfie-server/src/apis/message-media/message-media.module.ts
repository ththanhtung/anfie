import { Module } from '@nestjs/common';
import { MessageMediaService } from './message-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageMedia } from './entities';
import { MediaUploaderModule } from '../media-uploader/media-uploader.module';
import { MessageMediaRepository } from './repositories';

@Module({
	imports: [TypeOrmModule.forFeature([MessageMedia]), MediaUploaderModule],
	providers: [MessageMediaService, MessageMediaRepository],
	exports: [MessageMediaService]
})
export class MessageMediaModule {}
