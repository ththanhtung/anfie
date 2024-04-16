import { Injectable } from '@nestjs/common';
import { CreateGroupAdminDto } from '../dto/create-group.dto';
import { GroupRepository } from '../repositories';
import { UserService } from 'src/apis/user/services';

@Injectable()
export class GroupAdminService {
	constructor(
		private readonly groupRepository: GroupRepository,
		private readonly userService: UserService
	) {}

	async create(createGroupDto: CreateGroupAdminDto) {
		const users = await this.userService.findUsersByIds(createGroupDto.users);
		return this.groupRepository.createOne({
			creatorId: createGroupDto.creatorId,
			adminId: createGroupDto.adminId,
			users: users,
			title: createGroupDto.title
		});
	}
}
