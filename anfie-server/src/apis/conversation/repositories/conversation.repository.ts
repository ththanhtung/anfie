import { Repository } from 'typeorm';
import { Conversation } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto';
import { PaginationDto, pagination } from 'src/common';
@Injectable()
export class ConversationRepository extends Repository<Conversation> {
	constructor(@InjectRepository(Conversation) repository: Repository<Conversation>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(CreatorId: number, createConversationDto: CreateConversationDto) {
		const conversation = this.create();
		conversation.creatorId = CreatorId;
		conversation.recipientId = createConversationDto.recipientId;
		return this.save(conversation);
	}

	async checkExist(userId: number, recipientId: number) {
		const conversation = await this.findOne({
			where: [
				{
					creatorId: userId,
					recipientId: recipientId
				},
				{
					creatorId: recipientId,
					recipientId: userId
				}
			]
		});

		if (conversation) {
			throw new ConflictException([
				{
					message: 'conversation already exist'
				}
			]);
		}
	}

	async findOneById(id: number) {
		const conversation = await this.findOne({ where: { id: id } });
		if (!conversation) {
			throw new ConflictException([
				{
					field: 'id',
					message: 'conversation not found'
				}
			]);
		}
		return conversation;
	}

	async getConversations(userId: number, query: PaginationDto) {
		return pagination(this, query, {
			where: [
				{
					creatorId: userId
				},
				{ recipientId: userId }
			],
			relations: ['creator', 'recipient', 'lastMessage']
		});
	}

	async updateLastMessage({ conversationId, messageId }: TUpdateLastMessageParams) {
		return this.update(conversationId, { lastMessageId: messageId });
	}

	async deleteOneById(id: number) {
		return this.delete({ id: id });
	}

	async findOneByUserIds(creatorId: number, recipientId: number) {
		const conversation = await this.findOne({
			where: [
				{
					creatorId: creatorId,
					recipientId: recipientId
				},
				{
					creatorId: recipientId,
					recipientId: creatorId
				}
			]
		});

		console.log(conversation);
		return conversation;
	}
}
