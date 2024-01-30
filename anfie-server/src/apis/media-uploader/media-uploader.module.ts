import { Module } from '@nestjs/common';
import { MediaUploaderService } from './media-uploader.service';
import { CLOUDINARY } from 'src/common/constants';
import { v2 } from 'cloudinary';
@Module({
	providers: [
		MediaUploaderService,
		{
			provide: CLOUDINARY,
			useFactory: () => {
				return v2.config({
					cloud_name: process.env.CLD_CLOUD_NAME,
					api_key: process.env.CLD_API_KEY,
					api_secret: process.env.CLD_API_SECRET
				});
			}
		}
	],
	exports: [MediaUploaderService]
})
export class MediaUploaderModule {}
