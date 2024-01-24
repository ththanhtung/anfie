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
}
