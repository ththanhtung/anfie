/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { Users } from '../entities';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserRepository extends Repository<Users> {
	constructor(@InjectRepository(Users) repository: Repository<Users>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async checkExist(email: string) {
		const user = await this.findOne({ where: { email: email } });
		if (user) {
			throw new ConflictException([
				{
					field: 'email',
					message: 'Email already exist'
				}
			]);
		}
	}

	async findOneByEmail(email: string) {
		const user = await this.findOne({ where: { email: email } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'email',
					message: 'user not found'
				}
			]);
		}
		return user;
	}

	async findOneById(id: number) {
		const user = await this.findOne({ where: { id: id } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'id',
					message: 'user not found'
				}
			]);
		}
		return user;
	}

	async createOne(input: CreateUserDto) {
		await this.checkExist(input.email);
		const user = this.create(input);
		return this.save(user);
	}

	async updateRefreshToken(userId: number, refreshToken: string | null) {
		const user = await this.findOne({ where: { id: userId } });
		user.refreshToken = refreshToken;
		return this.save(user);
	}

	async findOneByRefreshToken(refreshToken: string) {
		const user = await this.findOne({ where: { refreshToken: refreshToken } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'refreshToken',
					message: 'user not found'
				}
			]);
		}
		return user;
	}
}
