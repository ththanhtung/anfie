import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';
import { TUploadProfileMediaParams } from 'src/common/@types/user-profile';

@Injectable()
export class MediaUploaderService {
	async uploadMedia(
		params: TUpdateMessageMediaParams | TUploadPostMediaParams | TUploadProfileMediaParams
	): Promise<UploadApiResponse | UploadApiErrorResponse> {
		return new Promise((resolve, reject) => {
			// Extract the appropriate key based on parameter type
			const mediaKey =
				'messageMedia' in params
					? params.messageMedia.key
					: 'profileMedia' in params
						? params.profileMedia.key
						: 'postMedia' in params
							? params.postMedia.key
							: null;

			const upload = v2.uploader.upload_stream(
				{
					folder: 'anfie',
					public_id: mediaKey
				},
				(error, result) => {
					if (error) return reject(error);
					resolve(result);
				}
			);

			// Process image with sharp (same for both cases)
			sharp(params.file.buffer)
				.resize({
					width: 800,
					height: 800,
					fit: 'inside',
					withoutEnlargement: true
				})
				.jpeg({
					quality: 80,
					mozjpeg: true
				})
				.toBuffer()
				.then((processedBuffer) => {
					const readableStream = Readable.from(processedBuffer);
					readableStream.pipe(upload);
				})
				.catch((error) => reject(error));
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

			// Process image with sharp
			sharp(params.file.buffer)
				.resize({
					width: 800,
					height: 800,
					fit: 'inside', // Maintain aspect ratio
					withoutEnlargement: true // Don't enlarge small images
				})
				.jpeg({
					quality: 80, // Reduce quality to 80%
					mozjpeg: true // Better compression
				})
				.toBuffer()
				.then((processedBuffer) => {
					const readableStream = Readable.from(processedBuffer);
					readableStream.pipe(upload);
				})
				.catch((error) => reject(error));
		});
	}
}
