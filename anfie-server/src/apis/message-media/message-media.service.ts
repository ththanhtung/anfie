import { Injectable } from '@nestjs/common';
import { MessageMediaRepository } from './repositories';
import { MediaUploaderService } from '../media-uploader/media-uploader.service';

@Injectable()
export class MessageMediaService {
	constructor(
		private readonly messageMediaRepository: MessageMediaRepository,
		private readonly mediaUploaderService: MediaUploaderService
	) {}
	async create(messageId: number, medias: Express.Multer.File[]) {
		if (!medias) {
			return;
		}
		const promise = medias.map((media) => {
			const newMedia = this.messageMediaRepository.createOne(messageId);
			this.mediaUploaderService.uploadMedia({
				file: media,
				messageMedia: newMedia
			});
			return newMedia;
		});
		return Promise.all(promise);
	}
}
