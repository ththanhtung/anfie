import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupRepository } from '../repositories';
import { AddRecipientDto, GetGroupsDto } from '../dto';
import { UserService } from 'src/apis/user/services';
import { FriendService } from 'src/apis/friend/services';
import { TUpdateLastGroupMessageParams } from 'src/common/@types/groups';
import { EGroupType } from 'src/common';
import { PostService } from 'src/apis/post/services';
import { GetPostsDto } from 'src/apis/post/dto';

@Injectable()
export class GroupService {
	constructor(
		private readonly groupRepository: GroupRepository,
		private readonly userService: UserService,
		private readonly friendService: FriendService,
		private readonly postService: PostService
	) {}

	async create(user: TUserJwt, createGroupDto: CreateGroupDto) {
		console.log({ createGroupDto });

		const users = await this.userService.findUsersByIds([...createGroupDto.users, user.userId]);
		const groupMembers = users.filter((u) => u.id !== user.userId);
		const groupOwner = users.find((u) => u.id === user.userId);

		for (const requestedUser of groupMembers) {
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
			...(user.userId && { adminId: user.userId.toString(), creatorId: user.userId.toString() }),
			users: [...groupMembers, groupOwner],
			title: createGroupDto.title,
			type: createGroupDto.type,
			alleyId: createGroupDto.alleyId
		});
	}

	async addRecipient(user: TUserJwt, groupId: string, addRecipientDto: AddRecipientDto) {
		const group = await this.groupRepository.findOneById(groupId);
		if (group.type === EGroupType.PRIVATE) {
			if (group.adminId !== user.userId) {
				throw new ForbiddenException([
					{
						message: 'only admin can add other user'
					}
				]);
			}
		}

		return this.groupRepository.addRecipient(groupId, addRecipientDto.recipientIds);
	}

	async leaveGroup(groupId: string, userId: string) {
		return this.groupRepository.leaveGroup({ groupId, userId });
	}

	async removeRecipient(groupId: string, userId: string, removeUserId: string) {
		await this.userService.findOneById(removeUserId);
		const group = await this.groupRepository.findOneById(groupId);
		if (group.type === EGroupType.PRIVATE) {
			if (group.adminId !== userId)
				throw new BadRequestException([
					{
						message: 'only admin can remove other user'
					}
				]);

			if (group.adminId === removeUserId)
				throw new BadRequestException([
					{
						message: 'you cannot remove yourself as an admin'
					}
				]);
		}

		return this.groupRepository.findOneAndRemoveUserById(groupId, removeUserId);
	}

	async getMyGroups(userId: string, query: GetGroupsDto) {
		return this.groupRepository.getMyGroups(userId, query);
	}

	async findOneById(id: string) {
		return this.groupRepository.findOne({ where: { id: id }, relations: ['users'] });
	}

	async updateLastGroupMessage({ groupId, messageId }: TUpdateLastGroupMessageParams) {
		return this.groupRepository.updateLastGroupMessage({ groupId, messageId });
	}

	async findPublicGroupById(id: string) {
		return this.groupRepository.findPublicGroupById(id);
	}

	async findGroupsByAlleyId(alleyId: string) {
		return this.groupRepository.findGroupsByAlleyId(alleyId);
	}

	async findGroupById(user: TUserJwt, id: string) {
		const group = await this.groupRepository.findOneById(id);

		const isInGroup = group.users.find((u) => u.id === user.userId);
		if (!isInGroup) {
			throw new ForbiddenException([
				{
					message: 'you are not in this group'
				}
			]);
		}

		delete group.users;
		return group;
	}

	async findGroupPosts(groupId: string, query: GetPostsDto) {
		return this.postService.getPostsByGroupId(groupId, query);
	}
}
