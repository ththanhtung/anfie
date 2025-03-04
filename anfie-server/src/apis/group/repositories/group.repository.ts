import { Repository } from 'typeorm';
import { Group } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { TCreateGroupParams, TLeaveGroupParams, TUpdateLastGroupMessageParams } from 'src/common/@types/groups';
import { UserService } from 'src/apis/user/services';
import { EGroupType, pagination } from 'src/common';
import { GetGroupsDto } from '../dto';

@Injectable()
export class GroupRepository extends Repository<Group> {
	constructor(
		@InjectRepository(Group) repository: Repository<Group>,
		private readonly userService: UserService
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(params: TCreateGroupParams) {
		const { creatorId, title, users, type, alleyId } = params;

		const groupParams = {
			adminId: creatorId,
			creatorId: creatorId,
			title,
			users,
			type: type as EGroupType,
			alleyId
		};

		return this.save(groupParams);
	}

	async findOneById(id: string) {
		const group = await this.findOne({ where: { id: id }, relations: ['users'] });
		if (!group) {
			throw new ConflictException([
				{
					field: 'id',
					message: 'group not found'
				}
			]);
		}
		return group;
	}

	async addRecipient(groupId: string, recipientIds: string[]) {
		const group = await this.findOneById(groupId);

		const recipients = await this.userService.findUsersByIds(recipientIds);

		for (const recipient of recipients) {
			const isUserInGroup = await this.isUserInGroup(groupId, recipient.id.toString());

			if (isUserInGroup)
				throw new BadRequestException([
					{
						field: 'recipientId',
						message: `user's id: ${recipient.id} is already in the group`
					}
				]);
		}

		group.users.push(...recipients);

		return this.save(group);
	}

	async isUserInGroup(groupId: string, userId: string) {
		const group = await this.findOneById(groupId);

		const inGroup = group.users.find((user) => user.id === userId);

		if (inGroup) return true;
		return false;
	}

	async leaveGroup({ groupId, userId }: TLeaveGroupParams) {
		return this.findOneAndRemoveUserById(groupId, userId);
	}

	async findOneAndRemoveUserById(groupId: string, userId: string) {
		const group = await this.findOne({ where: { id: groupId }, relations: ['users'] });
		if (group.type === EGroupType.PRIVATE) {
			if (group.adminId === userId)
				throw new BadRequestException([
					{
						message: 'admin cannot leave the group'
					}
				]);
		}

		group.users = group.users.filter((user) => user.id !== userId);
		return this.save(group);
	}

	async getMyGroups(userId: string, query: GetGroupsDto) {
		console.log({ userId });

		return pagination(this, query, {
			where: { users: { id: userId } },
			relations: ['creator', 'admin', 'lastMessage', 'users']
		});
	}

	async updateLastGroupMessage({ groupId, messageId }: TUpdateLastGroupMessageParams) {
		return this.update(groupId, { lastMessageId: messageId });
	}

	async findPublicGroupById(id: string) {
		const group = await this.findOne({
			where: { id: id, type: EGroupType.PUBLIC },
			relations: ['users', 'lastMessage', 'admin', 'creator']
		});
		if (!group) {
			throw new ConflictException([
				{
					field: 'id',
					message: 'group not found'
				}
			]);
		}
		return group;
	}

	async findGroupsByAlleyId(alleyId: string) {
		return this.findOne({
			where: {
				alleyId,
				alley: {
					disabled: false
				}
			}
		});
	}

	async findGroupPosts(groupId: string) {
		const group = await this.findOne({ where: { id: groupId }, relations: ['posts'] });

		if (!group) {
			throw new ConflictException([
				{
					field: 'id',
					message: 'group not found'
				}
			]);
		}

		return group.posts;
	}
}
