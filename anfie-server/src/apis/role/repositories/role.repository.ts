import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Role } from '../entities';
import { PaginationDto, pagination } from 'src/common';
import { CreateRoleDto } from '../dto';

@Injectable()
export class RoleRepository extends Repository<Role> {
	constructor(@InjectRepository(Role) repository: Repository<Role>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(dto: CreateRoleDto) {
		return this.save(dto);
	}
	async findOneOrFail(options: FindOneOptions<Role>) {
		const role = await this.findOne(options);

		if (!role) {
			throw new ForbiddenException([
				{
					field: 'id',
					message: 'Nhóm phân quyền không tồn tại'
				}
			]);
		}

		return role;
	}

	async checkExist(name: string) {
		const role = await this.findOne({ where: { name } });

		if (role) {
			throw new ConflictException([
				{
					field: 'name',
					message: 'Nhóm phần quyền đã tồn tại'
				}
			]);
		}
	}

	async getAllByName(name: string, query: PaginationDto) {
		const roles = await this.createQueryBuilder('role').where(`LOWER(role.name) LIKE LOWER('%${name}%')`).getMany();

		return pagination(this, query, {
			where: {
				id: In(roles.map((item) => item.id))
			}
		});
	}

	getAll(query: PaginationDto) {
		return pagination(this, query);
	}
}
