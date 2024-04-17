import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { extname } from 'path';

@Injectable()
export class UtilsService {
	async uploadMedia(files: Array<Express.Multer.File>) {
		const results = [];
		for (const file of files) {
			const randomName = Array(32)
				.fill(null)
				.map(() => Math.round(Math.random() * 16).toString(16))
				.join('');

			const fileName = `${randomName}${extname(file.originalname)}`;

			results.push(
				new Promise((resolve, reject) => {
					const upload = v2.uploader.upload_stream(
						{
							folder: 'anfie',
							public_id: fileName
						},
						(error, result) => {
							if (error) return reject(error);
							resolve(result);
						}
					);
					toStream(file.buffer).pipe(upload);
				})
			);
		}
		const response: TCloudinaryResponse[] = await Promise.all(results);

		return response.map((item) => {
			return {
				url: item.url
			};
		});
	}
}
