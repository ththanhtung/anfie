import { Injectable } from '@nestjs/common';
import { PostMediaRepository } from '../repositories';
import { MediaUploaderService } from '../../media-uploader/media-uploader.service';

@Injectable()
export class PostMediaService {
	constructor(
		private readonly postMediaRepository: PostMediaRepository,
		private readonly mediaUploaderService: MediaUploaderService
	) {}
	async create(postId: number, medias: Express.Multer.File[]) {
		if (!medias || medias === undefined) {
			return;
		}
		const promise = medias.map(async (media) => {
			const newMedia = await this.postMediaRepository.createOne(postId);
			await this.mediaUploaderService.uploadPostMedia({
				file: media,
				postMedia: newMedia
			});
			return newMedia;
		});
		return Promise.all(promise);
	}
}
