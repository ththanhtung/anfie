import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Admin } from '../entities';
import { GetAdminQueryDto } from '../dto';
import { pagination } from 'src/common';
import { TCreateAdminParams } from 'src/common/@types/admin';

@Injectable()
export class AdminRepository extends Repository<Admin> {
	private relations = ['roles'];
	constructor(@InjectRepository(Admin) repository: Repository<Admin>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(params: TCreateAdminParams) {
		const admin = this.create(params);
		return this.save(admin);
	}

	async checkExist(username: string) {
		const existingUser = await this.findOne({
			where: {
				username
			}
		});

		if (existingUser) {
			throw new ConflictException([
				{
					field: 'username',
					message: 'user already exist'
				}
			]);
		}
	}

	async findOneByUsername(username: string) {
		const existingUser = await this.findOne({
			where: {
				username
			},
			relations: this.relations
		});

		if (!existingUser) {
			throw new ForbiddenException([
				{
					field: 'username',
					message: 'user not found'
				}
			]);
		}

		return existingUser;
	}

	updateAccessToken(user_id: string, accessToken: string | undefined) {
		return this.update(
			{ id: user_id },
			{
				accessToken
			}
		);
	}

	async findOneOrFail(options: FindOneOptions<Admin>) {
		const user = await this.findOne({
			...options,
			relations: this.relations
		});

		if (!user) {
			throw new ForbiddenException([
				{
					field: 'user_admin',
					message: 'user not found'
				}
			]);
		}

		return user;
	}

	async removeById(id: string) {
		const user_admin = await this.findOneOrFail({ where: { id } });

		return this.softRemove(user_admin);
	}

	async getAllByName(name: string, query: GetAdminQueryDto) {
		const user_admin = await this.createQueryBuilder('admin').where(`LOWER(admin.name) LIKE LOWER('%${name}%')`).getMany();

		return pagination(this, query, {
			where: {
				id: In(user_admin.map((item) => item.id))
			},
			relations: this.relations
		});
	}

	async getAllByUsername(username: string, query: GetAdminQueryDto) {
		const user_admin = await this.createQueryBuilder('admin').where(`LOWER(admin.username) LIKE LOWER('%${username}%')`).getMany();

		return pagination(this, query, {
			where: {
				id: In(user_admin.map((item) => item.id))
			},
			relations: this.relations
		});
	}

	getAll(query: GetAdminQueryDto) {
		return pagination(this, query, {
			relations: this.relations
		});
	}
}
