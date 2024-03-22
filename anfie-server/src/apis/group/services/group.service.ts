import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupRepository } from '../repositories';
import { AddRecipientDto, removeRecipientDto } from '../dto';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class GroupService {
	constructor(
		private readonly groupRepository: GroupRepository,
		private readonly userService: UserService
	) {}

	async create(user: TUserJwt, createGroupDto: CreateGroupDto) {
		const userPromises = createGroupDto.users.map((id) => this.userService.findOneById(+id));
		const users = (await Promise.all(userPromises)).filter((user) => user);
		return this.groupRepository.createOne({
			creatorId: user.userId.toString(),
			adminId: user.userId.toString(),
			users: users,
			title: createGroupDto.title
		});
	}

	async addRecipient(user: TUserJwt, groupId: string, addRecipientDto: AddRecipientDto) {
		const group = await this.groupRepository.findOneById(groupId);
		console.log(group.admin);

		if (group.adminId !== user.userId) {
			throw new ForbiddenException();
		}

		return this.groupRepository.addRecipient(groupId, addRecipientDto.recipientId);
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
}
