import { Injectable } from '@nestjs/common';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { NoteRepository } from '../repositories';
import { GetNotesDto } from '../dto';

@Injectable()
export class NotesService {
	constructor(private readonly noteRepository: NoteRepository) {}
	async create(user: TUserJwt) {
		return this.noteRepository.createOne(user.userId.toString());
	}

	findAll(query: GetNotesDto) {
		return this.noteRepository.getNotes(query);
	}

	findOne(id: number) {
		return `This action returns a #${id} note`;
	}

	update(id: string, updateNoteDto: UpdateNoteDto) {
		return this.noteRepository.updateNote({
			id: id.toString(),
			...updateNoteDto
		});
	}

	remove(id: number) {
		return this.noteRepository.findOneAndRemoveById(id.toString());
	}
}
