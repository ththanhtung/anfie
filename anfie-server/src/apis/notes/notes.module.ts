import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities';
import { NoteRepository } from './repositories';

@Module({
	controllers: [NotesController],
	providers: [NotesService, NoteRepository],
	imports: [TypeOrmModule.forFeature([Note])]
})
export class NotesModule {}
