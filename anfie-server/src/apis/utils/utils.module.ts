import { Module } from '@nestjs/common';
import { UtilsService } from './services/utils.service';
import { UtilsController } from './utils.controller';
import { CLOUDINARY } from 'src/common/constants';
import { v2 } from 'cloudinary';

@Module({
	controllers: [UtilsController],
	providers: [
		UtilsService,
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
	]
})
export class UtilsModule {}
