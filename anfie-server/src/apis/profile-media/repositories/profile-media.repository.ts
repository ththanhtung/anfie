import { Repository } from 'typeorm';
import { ProfileMedia } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

export class ProfileMediaRepository extends Repository<ProfileMedia> {
	constructor(@InjectRepository(ProfileMedia) repository: Repository<ProfileMedia>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(profileId: string) {
		const messageMedia = await this.create({ profileId });
		return this.save(messageMedia);
	}

	async updateProfileMediaUrl(id: string, url: string) {
		return this.update(id, { url });
	}

	async deleteProfileMedia(id: string) {
		return this.delete(id);
	}
}
