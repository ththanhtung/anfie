import { Injectable } from '@nestjs/common';
import { ConversationRequestRepository } from '../repositories';
import { GetConversationRequestsAdminDto } from '../dto';

@Injectable()
export class ConversationRequestAdminService {
	constructor(private readonly conversationRequestRepository: ConversationRequestRepository) {}

	async getConversationRequests(query: GetConversationRequestsAdminDto) {
		return this.conversationRequestRepository.getConversationRequestsAdmin(query);
	}
}
