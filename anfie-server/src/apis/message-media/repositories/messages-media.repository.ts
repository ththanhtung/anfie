import { Repository } from 'typeorm';
import { MessageMedia } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

export class MessageMediaRepository extends Repository<MessageMedia> {
	constructor(@InjectRepository(MessageMedia) repository: Repository<MessageMedia>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(messageId: string) {
		const messageMedia = await this.create({ messageId });
		return this.save(messageMedia);
	}

	async updateMessageMediaUrl(id: string, url: string) {
		return this.update(id, { url });
	}
}
