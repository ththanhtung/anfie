import { UserProfiles } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class PreferGender extends BaseEntity<PreferGender> {
	@Column({ unique: true, name: 'name' })
	name: string;

	@ManyToMany(() => UserProfiles, (userProfiles) => userProfiles.preferGenders)
	userProfiles: UserProfiles[];
}
