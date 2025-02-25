import { IsArray } from 'class-validator';

export class DeleteProfileMediasDto {
	@IsArray()
	ids: string[];
}
