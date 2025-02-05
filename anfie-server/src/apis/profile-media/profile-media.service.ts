import { Injectable } from '@nestjs/common';
import { ProfileMediaRepository } from './repositories';
import { MediaUploaderService } from '../media-uploader/media-uploader.service';

@Injectable()
export class ProfileMediaService {
	constructor(
		private readonly profileMediaRepository: ProfileMediaRepository,
		private readonly mediaUploaderService: MediaUploaderService
	) {}
	async create(profileId: string, medias: Express.Multer.File[]) {
		if (!medias || medias === undefined) {
			return;
		}

		const promise = medias.map(async (media) => {
			const newMedia = await this.profileMediaRepository.createOne(profileId);
			await this.mediaUploaderService
				.uploadMedia({
					file: media,
					profileMedia: newMedia
				})
				.then((data) => {
					this.profileMediaRepository.updateProfileMediaUrl(newMedia.id, data.url);
				});
			return newMedia;
		});
		return Promise.all(promise);
	}
}
