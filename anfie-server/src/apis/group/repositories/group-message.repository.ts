import { In, Repository } from 'typeorm';
import { GroupMessage } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common';
import { GetGroupMessagesDto } from '../dto';

export class GroupMessageRepository extends Repository<GroupMessage> {
	constructor(@InjectRepository(GroupMessage) repository: Repository<GroupMessage>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(createGroupMessageParams: TCreateGroupMessageParams) {
		const message = this.create();
		message.content = createGroupMessageParams.content;
		message.userId = createGroupMessageParams.userId;
		message.groupId = createGroupMessageParams.groupId;
		const savedMessage = await this.save(message);
		const newMessage = await this.findOne({
			where: {
				id: savedMessage.id
			},
			relations: ['user']
		});

		return newMessage;
	}

	async getGroupMessagesFromGroupConversation(groupId: string, query: GetGroupMessagesDto) {
		return pagination(this, query, {
			where: {
				groupId: groupId
			},
			relations: ['user', 'group', 'group.users', 'medias']
		});
	}

	async getGroupMessagesByIds(ids: string[]) {
		return this.find({ relations: ['user', 'group.users', 'medias'], where: { id: In(ids) } });
	}
}
