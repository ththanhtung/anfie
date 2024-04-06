import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities';
import { NoteRepository } from './repositories';
import { UserModule } from '../user/user.module';

@Module({
	controllers: [NotesController],
	providers: [NotesService, NoteRepository],
	imports: [TypeOrmModule.forFeature([Note]), UserModule]
})
export class NotesModule {}
