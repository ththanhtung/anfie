import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
	@IsOptional()
	title: string;

	@IsOptional()
	@IsString()
	content: string;

	@IsOptional()
	isPin: boolean;
}
