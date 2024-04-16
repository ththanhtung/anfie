import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from '../entities';
import { CreateTagDto, GetTagsDto } from '../dto';
import { pagination } from 'src/common';

export class TagRepository extends Repository<Tag> {
	constructor(@InjectRepository(Tag) repository: Repository<Tag>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(dto: CreateTagDto) {
		return this.save(dto);
	}

	async findAllTags(query: GetTagsDto) {
		return pagination(this, query);
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: +id
			}
		});
	}

	async removeOneById(id: string) {
		return this.delete({ id: +id });
	}

	async findByNames(names: string[]) {
		return this.find({
			where: { name: In(names) }
		});
	}
}
