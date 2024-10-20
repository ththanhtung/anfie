import { Like, Repository } from 'typeorm';
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
			userId: userId
		});
	}

	async updateNote({ id, title, content, isPin }: TUpdateNodeParams) {
		await this.save({
			id: id,
			title,
			content,
			isPin
		});

		const note = this.findOneById(id);
		return note;
	}

	async getNotes(query: GetNotesDto) {
		return pagination(this, query);
	}

	async findOneAndRemoveById(id: string) {
		return this.delete({ id: id });
	}

	findNotesByUserId(id: string, query: GetNotesDto) {
		return pagination(this, query, {
			relations: ['user'],
			where: {
				userId: id,
				...(query.title ? { title: Like(`%${query.title}%`) } : {})
			}
		});
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: id
			}
		});
	}
}
