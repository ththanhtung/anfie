import { UserProfiles } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Location extends BaseEntity<Location> {
	@Column({ unique: true, name: 'location_name' })
	name: string;

	@ManyToMany(() => UserProfiles, (userProfiles) => userProfiles.locations)
	userProfiles: UserProfiles[];
}
