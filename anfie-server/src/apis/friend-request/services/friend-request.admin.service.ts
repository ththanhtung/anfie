import { Injectable } from '@nestjs/common';
import { FriendRequestRepository } from '../repositories';
import { GetFriendRequestsAdminDto } from '../dto';

@Injectable()
export class FriendRequestAdminService {
	constructor(private readonly friendRequestRepository: FriendRequestRepository) {}

	async getFriendRequests(query: GetFriendRequestsAdminDto) {
		return this.friendRequestRepository.getFriendRequestsAdmin(query);
	}
}
