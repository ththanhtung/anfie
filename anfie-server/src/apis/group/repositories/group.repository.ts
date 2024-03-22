import { Repository } from 'typeorm';
import { Group } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { TCreateGroupParams } from 'src/common/@types/groups';
import { UserService } from 'src/apis/user/services';
import { Users } from 'src/apis/user/entities';

@Injectable()
export class GroupRepository extends Repository<Group> {
	constructor(
		@InjectRepository(Group) repository: Repository<Group>,
		private readonly userService: UserService
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(params: TCreateGroupParams) {
		const { creatorId, title, users } = params;

		const groupParams = {
			adminId: +creatorId,
			creatorId: +creatorId,
			title,
			users
		};

		return this.save(groupParams);
	}

	async findOneById(id: string) {
		const group = await this.findOne({ where: { id: +id }, relations: ['users'] });
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

	async addRecipient(groupId: string, recipientId: string) {
		const group = await this.findOneById(groupId);

		const inGroup = group.users.find((user) => user.id === +recipientId);

		if (inGroup) {
			throw new BadRequestException();
		}

		const recipient = await this.userService.findOneById(+recipientId);

		group.users.push(recipient);

		return this.save(group);
	}
}
