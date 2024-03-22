import { Repository } from 'typeorm';
import { Group } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { TCreateGroupParams } from 'src/common/@types/groups';

@Injectable()
export class GroupRepository extends Repository<Group> {
	constructor(@InjectRepository(Group) repository: Repository<Group>) {
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
		const group = await this.findOne({ where: { id: +id } });
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
}
