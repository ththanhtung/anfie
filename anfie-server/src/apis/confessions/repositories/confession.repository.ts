import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Confession } from '../entities';
import { pagination } from 'src/common';
import { GetConfestionsDto } from '../dto';

@Injectable()
export class ConfessionRepository extends Repository<Confession> {
	constructor(@InjectRepository(Confession) repository: Repository<Confession>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne({ ownerId, content }: TCreateConfession) {
		return this.save({ ownerId: +ownerId, content });
	}

	async getConfestions(query: GetConfestionsDto) {
		return pagination(this, query);
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: +id
			}
		});
	}
}
