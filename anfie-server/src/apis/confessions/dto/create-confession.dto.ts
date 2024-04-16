import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConfestionDto {
	@IsString()
	@IsNotEmpty()
	content: string;

	@IsString({ each: true })
	@IsOptional()
	tags: string[];
}
