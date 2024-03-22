import { ArrayNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
	@IsString({ each: true })
	@ArrayNotEmpty()
	users: string[];

	@IsString()
	title: string;
}
