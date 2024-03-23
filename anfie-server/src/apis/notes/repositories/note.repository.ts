import { Repository } from 'typeorm';
import { Note } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common';
import { GetNotesDto } from '../dto/get-notes.dto';

export class NoteRepository extends Repository<Note> {
	constructor(@InjectRepository(Note) repository: Repository<Note>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(userId: string) {
		return this.save({
			userId
		});
	}

	async updateNote({ id, title, content, isPin }: TUpdateNodeParams) {
		return this.save({
			id: +id,
			title,
			content,
			isPin
		});
	}

	async getNotes(query: GetNotesDto) {
		return pagination(this, query);
	}

	async findOneAndRemoveById(id: string) {
		return this.delete({ id: +id });
	}
}
