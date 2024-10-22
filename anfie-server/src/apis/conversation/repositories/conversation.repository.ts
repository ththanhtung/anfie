import { Repository } from 'typeorm';
import { Conversation } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto';
import { EConversationMode, PaginationDto, pagination } from 'src/common';
@Injectable()
export class ConversationRepository extends Repository<Conversation> {
	constructor(@InjectRepository(Conversation) repository: Repository<Conversation>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(createConversationDto: CreateConversationDto) {
		const conversation = this.create();
		conversation.creatorId = createConversationDto.user1;
		conversation.recipientId = createConversationDto.user2;
		return this.save(conversation);
	}

	async checkExist(userId: string, recipientId: string) {
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

	async findOneById(id: string) {
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

	async getConversations(userId: string, query: PaginationDto) {
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

	async deleteOneById(id: string) {
		return this.delete({ id: id });
	}

	async findOneByUserIds(creatorId: string, recipientId: string) {
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

	async toggleConversationMode(id: string) {
		const conversation = await this.findOneById(id);
		conversation.mode = conversation.mode === EConversationMode.FRIEND ? EConversationMode.STRANGER : EConversationMode.FRIEND;
		return this.save(conversation);
	}
}
