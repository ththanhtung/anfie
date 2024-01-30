import { Repository } from 'typeorm';
import { Conversation } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto';
@Injectable()
export class ConversationRepository extends Repository<Conversation> {
	constructor(@InjectRepository(Conversation) repository: Repository<Conversation>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(user: TUserJwt, createConversationDto: CreateConversationDto) {
		const conversation = this.create();
		conversation.creatorId = user.userId;
		conversation.recipientId = createConversationDto.recipientId;
		return this.save(conversation);
	}

	async checkExist(userId: number, recipientId: number) {
		const conversation = await this.findOne({ where: { creatorId: userId, recipientId: recipientId } });
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

	async getConversations(userId: number) {
		return this.createQueryBuilder('conversation')
			.leftJoinAndSelect('conversation.lastMessage', 'lastMessage')
			.leftJoinAndSelect('conversation.creator', 'creator')
			.leftJoinAndSelect('conversation.recipient', 'recipient')
			.where('creator.id = :id', { id: userId })
			.orWhere('recipient.id = :id', { id: userId })
			.getMany();
	}
}
