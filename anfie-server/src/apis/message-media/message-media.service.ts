import { Injectable } from '@nestjs/common';
import { MessageMediaRepository } from './repositories';
import { MediaUploaderService } from '../media-uploader/media-uploader.service';
import { extname } from 'path';

@Injectable()
export class MessageMediaService {
	constructor(
		private readonly messageMediaRepository: MessageMediaRepository,
		private readonly mediaUploaderService: MediaUploaderService
	) {}
	async create(messageId: number, medias: Express.Multer.File[]) {
		if (!medias || medias === undefined) {
			return;
		}
		const promise = medias.map(async (media) => {
			const newMedia = await this.messageMediaRepository.createOne(messageId);
			await this.mediaUploaderService.uploadMedia({
				file: media,
				messageMedia: newMedia
			});
			return newMedia;
		});
		return Promise.all(promise);
	}
}
