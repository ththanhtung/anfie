import { Module } from '@nestjs/common';
import { ProfileMediaService } from './profile-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileMedia } from './entities';
import { MediaUploaderModule } from '../media-uploader/media-uploader.module';
import { ProfileMediaRepository } from './repositories';

@Module({
	imports: [TypeOrmModule.forFeature([ProfileMedia]), MediaUploaderModule],
	providers: [ProfileMediaService, ProfileMediaRepository],
	exports: [ProfileMediaService]
})
export class ProfileMediaModule {}
