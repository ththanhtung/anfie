/* eslint-disable prettier/prettier */
import { In, Repository } from 'typeorm';
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

	async findOneById(id: string) {
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

	async updateRefreshToken(userId: string, refreshToken: string | null) {
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
	async updateAccessToken(userId: string, accessToken: string | null) {
		const user = await this.findOne({ where: { id: userId } });
		user.accessToken = accessToken;
		return this.save(user);
	}

	async findOneByAccessToken(accessToken: string) {
		const user = await this.findOne({ where: { accessToken: accessToken } });
		if (!user) {
			throw new ConflictException([
				{
					field: 'accessToken',
					message: 'user not found'
				}
			]);
		}
		return user;
	}

	async findUsersByIds(ids: string[]) {
		return this.find({ where: { id: In(ids) } });
	}

	async updateUserInfo(user: { id: string; firstName?: string; lastName?: string; dob?: Date; profilePictureUrl?: string }) {
		await this.update(
			{ id: user.id },
			{
				firstName: user.firstName,
				lastName: user.lastName,
				dob: user.dob,
				profilePictureUrl: user.profilePictureUrl
			}
		);

		return this.findOne({
			where: {
				id: user.id
			}
		});
	}
}
