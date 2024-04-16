import { ArrayNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
	@IsString({ each: true })
	@ArrayNotEmpty()
	users: string[];

	@IsString()
	title: string;
}

export class CreateGroupAdminDto {
	@IsString({ each: true })
	@ArrayNotEmpty()
	users: string[];

	@IsString()
	title: string;

	@IsString()
	creatorId: string;

	@IsString()
	adminId: string;
}
