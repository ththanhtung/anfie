import { IsOptional, IsString } from 'class-validator';

export class CreateAlleyDto {
	@IsString()
	title: string;

	@IsString()
	@IsOptional()
	parentId?: string;
}
