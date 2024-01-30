import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import * as argon from 'argon2';
import { Exclude } from 'class-transformer';
import { UserProfiles } from './user-profile.entity';
import { Message } from 'src/apis/message/entities';
import { Group } from 'src/apis/group/entities';

@Entity()
export class Users extends BaseEntity<Users> {
	@Column({
		name: 'user_email'
	})
	email: string;

	@Exclude()
	@Column({
		name: 'user_hash'
	})
	hash: string;

	@OneToMany(() => Message, (message) => message.user)
	@JoinColumn()
	messages: Message[];

	@Exclude()
	@Column({ name: 'user_refresh_token', nullable: true })
	refreshToken?: string;

	@Exclude()
	@Column({ name: 'user_access_token', nullable: true })
	accessToken?: string;

	@OneToOne(() => UserProfiles)
	@JoinColumn()
	profile: UserProfiles;

	@ManyToMany(() => Group, (group) => group.users)
	groups: Group[];

	@BeforeInsert()
	@Exclude()
	async hashedPassword() {
		this.hash = await argon.hash(this.hash);
	}
}
