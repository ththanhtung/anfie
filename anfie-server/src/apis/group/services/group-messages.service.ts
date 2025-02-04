import { Injectable } from '@nestjs/common';
import { GetGroupMessagesDto } from '../dto';
import { GroupService } from 'src/apis/group/services';
import { GroupMessageRepository } from '../repositories';
import { MessageMediaService } from 'src/apis/message-media/message-media.service';
import { EMessageType } from 'src/common';

@Injectable()
export class GroupMessageService {
	constructor(
		private readonly groupService: GroupService,
		private readonly messageRepository: GroupMessageRepository,
		private readonly messageMediaService: MessageMediaService
	) {}
	async create(createGroupMessageParams: TCreateGroupMessageParams) {
		const message = await this.messageRepository.createOne(createGroupMessageParams);
		await this.groupService.updateLastGroupMessage({
			groupId: createGroupMessageParams.groupId,
			messageId: message.id
		});

		await this.messageMediaService.create(message.id, createGroupMessageParams.medias, EMessageType.GROUP);

		const updatedMessage = await this.messageRepository.getGroupMessagesByIds([message.id]);

		return { ...updatedMessage[0] };
	}

	async getGroupMessagesFromGroupConversation(groupId: string, query: GetGroupMessagesDto) {
		return this.messageRepository.getGroupMessagesFromGroupConversation(groupId, query);
	}

	async getGroupMessagesByIds(ids: string[]) {
		return this.messageRepository.getGroupMessagesByIds(ids);
	}
}
