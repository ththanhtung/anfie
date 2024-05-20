import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repositories';
import { GetRoleQueryDto } from '../dto';

@Injectable()
export class RoleService {
	constructor(private readonly roleRepository: RoleRepository) {}
	async create(dto: CreateRoleDto) {
		await this.roleRepository.checkExist(dto.name);
		return this.roleRepository.createOne(dto);
	}

	async findAll(query: GetRoleQueryDto) {
		if (query.name) {
			return this.roleRepository.getAllByName(query.name, query);
		}

		return this.roleRepository.getAll(query);
	}

	async getDetailById(id: string) {
		return this.roleRepository.findOneOrFail({ where: { id } });
	}

	async getDetailName(name: string) {
		return this.roleRepository.findOneOrFail({ where: { name } });
	}

	async update(id: string, updateRoleDto: UpdateRoleDto) {
		const { name, permissions } = updateRoleDto;

		const role = await this.getDetailById(id);

		role.name = name ? name : role.name;
		role.permissions = permissions ? permissions : role.permissions;

		return this.roleRepository.save(role);
	}

	async remove(id: string) {
		const role = await this.getDetailById(id);
		return this.roleRepository.softRemove(role);
	}
}
