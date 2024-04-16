import { IsString } from 'class-validator';

export class CreateFriendDto {
	followerId: string;
}

export class CreateFriendAdminDto {
	@IsString()
	user1: string;

	@IsString()
	user2: string;
}
