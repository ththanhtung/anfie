import { UserProfiles } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class ProfileMedia extends BaseEntity<ProfileMedia> {
	@Column()
	key: string;

	@Column({
		name: 'profile_id',
		nullable: true
	})
	profileId: string;

	@ManyToOne(() => UserProfiles, (Profile) => Profile.medias, { cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'profile_id'
	})
	profile: UserProfiles;

	@BeforeInsert()
	generateKey() {
		this.key = uuidv4();
	}

	@Column({
		name: 'profile_media_url',
		nullable: true
	})
	url: string;
}
