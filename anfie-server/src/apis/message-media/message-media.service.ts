import { Injectable } from '@nestjs/common';
import { MessageMediaRepository } from './repositories';
import { MediaUploaderService } from '../media-uploader/media-uploader.service';
import { EMessageType } from 'src/common';

@Injectable()
export class MessageMediaService {
	constructor(
		private readonly messageMediaRepository: MessageMediaRepository,
		private readonly mediaUploaderService: MediaUploaderService
	) {}
	async create(messageId: string, medias: Express.Multer.File[], type: EMessageType = EMessageType.CONVERSATION) {
		if (!medias || medias === undefined) {
			return;
		}

		const promise = medias.map(async (media) => {
			const newMedia = await this.messageMediaRepository.createOne(messageId, type);
			await this.mediaUploaderService
				.uploadMedia({
					file: media,
					messageMedia: newMedia
				})
				.then((data) => {
					this.messageMediaRepository.updateMessageMediaUrl(newMedia.id, data.url);
				});
			return newMedia;
		});
		return Promise.all(promise);
	}
}
