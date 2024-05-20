import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetNotesDto } from './dto/get-notes.dto';

@UseGuards(AtGuard)
@Controller('notes')
export class NotesController {
	constructor(private readonly notesService: NotesService) {}

	@Post()
	create(@GetCurrentUser() user: TUserJwt) {
		return this.notesService.create(user);
	}

	@Get()
	findAll(@GetCurrentUser('userId') userId: string, @Query() query: GetNotesDto) {
		return this.notesService.findNotesByUserId(userId, query);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.notesService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
		return this.notesService.update(id, updateNoteDto);
	}

	@Delete(':id/delete')
	remove(@Param('id') id: string) {
		return this.notesService.remove(id);
	}
}
