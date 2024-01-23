import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import * as argon from 'argon2';
import { Exclude } from 'class-transformer';
import { UserProfiles } from './user-profile.entity';

@Entity()
export class Users extends BaseEntity<Users> {
	@Column({
		name: 'user_email'
	})
	email: string;

	@Column({
		name: 'user_hash'
	})
	hash: string;

	@Column({ name: 'user_refresh_token', nullable: true })
	refreshToken?: string;

	@Column({ name: 'user_access_token', nullable: true })
	accessToken?: string;

	@OneToOne(() => UserProfiles)
	@JoinColumn()
	profile: UserProfiles;

	@BeforeInsert()
	@Exclude()
	async hashedPassword() {
		this.hash = await argon.hash(this.hash);
	}
}
