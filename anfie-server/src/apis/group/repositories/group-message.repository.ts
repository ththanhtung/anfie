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
		return this.save(message);
	}

	async getGroupMessagesFromGroupConversation(groupId: number, query: GetGroupMessagesDto) {
		return pagination(this, query, {
			where: {
				groupId: groupId
			},
			relations: ['user']
		});
	}

	async getGroupMessagesByIds(ids: string[]) {
		const idsInt = ids.map((id) => +id);
		return this.find({ where: { id: In(idsInt) } });
	}
}
