import { UserProfiles } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Preference extends BaseEntity<Preference> {
	@Column({
		unique: true,
		name: 'preference_name'
	})
	name: string;

	@ManyToMany(() => UserProfiles, (users) => users.preferences)
	userProfiles: UserProfiles[];
}
