import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Confession } from '../entities';
import { GetConfessionsAdminDto, GetConfestionsDto } from '../dto';
import { TCreateConfession } from 'src/common/@types/confession';
import { pagination } from 'src/common';

@Injectable()
export class ConfessionRepository extends Repository<Confession> {
	constructor(@InjectRepository(Confession) repository: Repository<Confession>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne({ ownerId, content, tags }: TCreateConfession) {
		return this.save({ ownerId: +ownerId, content, tags });
	}

	async getConfestionsRandom(query: GetConfestionsDto) {
		const limit = query.limit ? +query.limit : 10;

		if (!query.tagIds) {
			return await this.createQueryBuilder('confession').select().orderBy('RANDOM()').take(limit).getManyAndCount();
		}

		const ids = JSON.parse(query.tagIds);
		const tagIds = ids.map((item) => +item);
		return await this.createQueryBuilder('confession')
			.innerJoinAndSelect('confession.tags', 'tag')
			.where('tag.id IN (:...tagIds)', {
				tagIds
			})
			.limit(limit)
			.orderBy('RANDOM()')
			.getManyAndCount();
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: +id
			}
		});
	}

	async getConfessions(query: GetConfessionsAdminDto) {
		return pagination(this, query, {
			where: {
				ownerId: +query.userId || null,
				tags: {
					name: query.tag
				}
			}
		});
	}
}
