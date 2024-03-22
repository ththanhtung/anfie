import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupRepository } from '../repositories';
import { AddRecipientDto } from '../dto';
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
}
