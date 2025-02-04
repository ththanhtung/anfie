import { In, Repository } from 'typeorm';
import { Message } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common';
import { GetMessagesDto } from '../dto';

export class MessageRepository extends Repository<Message> {
	constructor(@InjectRepository(Message) repository: Repository<Message>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(createMessageParams: TCreateMessageParams) {
		const message = this.create();
		message.content = createMessageParams.content;
		message.userId = createMessageParams.userId;
		message.conversationId = createMessageParams.conversationId;
		return this.save(message);
	}

	async getMessagesFromConversation(conversationId: string, query: GetMessagesDto) {
		return pagination(this, query, {
			where: {
				conversationId: conversationId
			},
			relations: ['user', 'medias']
		});
	}

	async getMessagesByIds(ids: string[]) {
		return this.find({ relations: ['user', 'medias'], where: { id: In(ids) } });
	}
}
