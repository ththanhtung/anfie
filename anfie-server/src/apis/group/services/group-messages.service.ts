import { Injectable } from '@nestjs/common';
import { GetGroupMessagesDto } from '../dto';
import { GroupService } from 'src/apis/group/services';
import { GroupMessageRepository } from '../repositories';
import { MessageMediaService } from 'src/apis/message-media/message-media.service';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class GroupMessageService {
	constructor(
		private readonly groupService: GroupService,
		private readonly messageRepository: GroupMessageRepository,
		private readonly messageMediaService: MessageMediaService,
		private readonly userServices: UserService
	) {}
	async create(createGroupMessageParams: TCreateGroupMessageParams) {
		const group = await this.groupService.findOneById(createGroupMessageParams.groupId.toString());

		const message = await this.messageRepository.createOne(createGroupMessageParams);
		const user = await this.userServices.findOneById(message.userId);

		await this.groupService.updateLastGroupMessage({
			groupId: createGroupMessageParams.groupId,
			messageId: message.id
		});

		this.messageMediaService.create(message.id, createGroupMessageParams.medias);

		return { ...message, user, group };
	}

	async getGroupMessagesFromGroupConversation(groupId: number, query: GetGroupMessagesDto) {
		return this.messageRepository.getGroupMessagesFromGroupConversation(groupId, query);
	}

	async getGroupMessagesByIds(ids: string[]) {
		return this.messageRepository.getGroupMessagesByIds(ids);
	}
}
