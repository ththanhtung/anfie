import { Repository } from 'typeorm';
import { PostMedia } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

export class PostMediaRepository extends Repository<PostMedia> {
	constructor(@InjectRepository(PostMedia) repository: Repository<PostMedia>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(postId: number) {
		const postMedia = await this.create({ postId });
		return this.save(postMedia);
	}
}
