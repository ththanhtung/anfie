import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Confestion } from '../entities';

@Injectable()
export class ConfestionRepository extends Repository<Confestion> {
	constructor(@InjectRepository(Confestion) repository: Repository<Confestion>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne({ ownerId, content }: TCreateConfestion) {
		return this.save({ ownerId: +ownerId, content });
	}
}
