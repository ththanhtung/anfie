import { IsArray } from 'class-validator';

export class UpdateUserPreferencesDto {
	@IsArray()
	preferences: string[];

	@IsArray()
	locations: string[];
}
