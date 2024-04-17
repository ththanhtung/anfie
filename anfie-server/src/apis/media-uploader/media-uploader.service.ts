import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class MediaUploaderService {
	async uploadMedia(params: TUpdateMessageMediaParams): Promise<UploadApiResponse | UploadApiErrorResponse> {
		return new Promise((resolve, reject) => {
			const upload = v2.uploader.upload_stream(
				{
					folder: 'anfie',
					public_id: params.messageMedia.key
				},
				(error, result) => {
					if (error) return reject(error);
					resolve(result);
				}
			);
			toStream(params.file.buffer).pipe(upload);
		});
	}

	async uploadPostMedia(params: TUploadPostMediaParams): Promise<UploadApiResponse | UploadApiErrorResponse> {
		return new Promise((resolve, reject) => {
			const upload = v2.uploader.upload_stream(
				{
					folder: 'anfie',
					public_id: params.postMedia.key
				},
				(error, result) => {
					if (error) return reject(error);
					resolve(result);
				}
			);
			toStream(params.file.buffer).pipe(upload);
		});
	}
}
