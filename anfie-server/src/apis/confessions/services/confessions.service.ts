import { Injectable } from '@nestjs/common';
import { CreateConfestionDto } from '../dto/create-confession.dto';
import { ConfessionRepository } from '../repositories';
import { GetConfestionsDto } from '../dto';

@Injectable()
export class ConfessionsService {
	constructor(private readonly confestionRepository: ConfessionRepository) {}

	async createOne(user: TUserJwt, { content }: CreateConfestionDto) {
		return this.confestionRepository.createOne({ ownerId: user.userId.toString(), content });
	}

	async getConfestionsRandom(query: GetConfestionsDto) {
		return this.confestionRepository.getConfestionsRandom(query);
	}

	async findOneById(id: string) {
		return this.confestionRepository.findOneById(id);
	}
}
