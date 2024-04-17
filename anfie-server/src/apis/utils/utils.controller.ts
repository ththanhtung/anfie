import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UtilsService } from './services/utils.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('utils')
export class UtilsController {
	constructor(private readonly utilsService: UtilsService) {}
	@Post('upload')
	@UseInterceptors(FilesInterceptor('medias'))
	async upload(@UploadedFiles() medias: Express.Multer.File[]) {
		return this.utilsService.uploadMedia(medias);
	}
}
