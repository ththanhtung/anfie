import { Injectable } from '@nestjs/common';
import { CreateConfestionDto } from '../dto/create-confession.dto';
import { ConfessionRepository } from '../repositories';
import { GetConfessionsAdminDto, GetConfestionsDto } from '../dto';
import { TagService } from 'src/apis/tag/services';

@Injectable()
export class ConfessionsService {
	constructor(
		private readonly confestionRepository: ConfessionRepository,
		private readonly tagService: TagService
	) {}

	async createOne(userId: string, dto: CreateConfestionDto) {
		const tags = await this.tagService.findByNames(dto.tags);
		return this.confestionRepository.createOne({ ownerId: userId, content: dto.content, tags });
	}

	async getConfestionsRandom(query: GetConfestionsDto) {
		return this.confestionRepository.getConfestionsRandom(query);
	}

	async findOneById(id: string) {
		return this.confestionRepository.findOneById(id);
	}

	async getConfessions(query: GetConfessionsAdminDto) {
		return this.confestionRepository.getConfessions(query);
	}
}
