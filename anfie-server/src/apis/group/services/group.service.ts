import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupRepository } from '../repositories';
import { AddRecipientDto, GetGroupsDto } from '../dto';
import { UserService } from 'src/apis/user/services';
import { FriendService } from 'src/apis/friend/services';
import { TUpdateLastGroupMessageParams } from 'src/common/@types/groups';

@Injectable()
export class GroupService {
	constructor(
		private readonly groupRepository: GroupRepository,
		private readonly userService: UserService,
		private readonly friendService: FriendService
	) {}

	async create(user: TUserJwt, createGroupDto: CreateGroupDto) {
		const users = await this.userService.findUsersByIds(createGroupDto.users);

		for (const requestedUser of users) {
			const isFriend = await this.friendService.isFriend(user.userId.toString(), requestedUser.id.toString());
			if (!isFriend) {
				throw new BadRequestException([
					{
						message: 'some users are not friends'
					}
				]);
			}
		}

		return this.groupRepository.createOne({
			creatorId: user.userId.toString(),
			adminId: user.userId.toString(),
			users: users,
			title: createGroupDto.title
		});
	}

	async addRecipient(user: TUserJwt, groupId: string, addRecipientDto: AddRecipientDto) {
		const group = await this.groupRepository.findOneById(groupId);
		if (group.adminId !== user.userId) {
			throw new ForbiddenException([
				{
					message: 'only admin can add other user'
				}
			]);
		}

		return this.groupRepository.addRecipient(groupId, addRecipientDto.recipientIds);
	}

	async leaveGroup(groupId: string, userId: string) {
		return this.groupRepository.leaveGroup({ groupId, userId });
	}

	async removeRecipient(groupId: string, userId: string, removeUserId: string) {
		await this.userService.findOneById(+removeUserId);
		const group = await this.groupRepository.findOneById(groupId);
		if (group.adminId !== +userId)
			throw new BadRequestException([
				{
					message: 'only admin can remove other user'
				}
			]);

		if (group.adminId === +removeUserId)
			throw new BadRequestException([
				{
					message: 'you cannot remove yourself as an admin'
				}
			]);

		return this.groupRepository.findOneAndRemoveUserById(groupId, removeUserId);
	}

	async getMyGroups(userId: string, query: GetGroupsDto) {
		return this.groupRepository.getMyGroups(userId, query);
	}

	async findOneById(id: string) {
		return this.groupRepository.findOne({ where: { id: +id }, relations: ['users'] });
	}

	async updateLastGroupMessage({ groupId, messageId }: TUpdateLastGroupMessageParams) {
		return this.groupRepository.updateLastGroupMessage({ groupId, messageId });
	}
}
