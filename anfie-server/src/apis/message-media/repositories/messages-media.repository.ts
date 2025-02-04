import { Repository } from 'typeorm';
import { MessageMedia } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EMessageType } from 'src/common';

export class MessageMediaRepository extends Repository<MessageMedia> {
	constructor(@InjectRepository(MessageMedia) repository: Repository<MessageMedia>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(messageId: string, type: EMessageType = EMessageType.CONVERSATION) {
		console.log({ messageId });
		const messageMedia = await this.create({ ...(type === EMessageType.CONVERSATION ? { messageId } : { groupMessageId: messageId }) });
		return this.save(messageMedia);
	}

	async updateMessageMediaUrl(id: string, url: string) {
		return this.update(id, { url });
	}
}
