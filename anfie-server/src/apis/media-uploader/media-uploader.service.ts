import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

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
