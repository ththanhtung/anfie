import { BaseEntity } from 'src/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserProfiles extends BaseEntity<UserProfiles> {
	@Column({
		name: 'user_avatar'
	})
	avatar: string;

	@Column({
		name: 'user_bio'
	})
	bio: string;
}
