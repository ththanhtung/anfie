import { Injectable } from '@nestjs/common';
import { CreateTagDto, GetTagsDto } from '../dto';
import { TagRepository } from '../repositories';

@Injectable()
export class TagService {
	constructor(private readonly tagRepository: TagRepository) {}
	create(createTagDto: CreateTagDto) {
		return this.tagRepository.createOne(createTagDto);
	}

	findAll(query: GetTagsDto) {
		return this.tagRepository.findAllTags(query);
	}

	findOneById(id: string) {
		return this.tagRepository.findOneById(id);
	}

	remove(id: string) {
		return this.tagRepository.removeOneById(id);
	}

	async findByNames(names: string[]) {
		if (!names) return [];
		return this.tagRepository.findByNames(names);
	}
}
