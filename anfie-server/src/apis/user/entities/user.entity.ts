import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import * as argon from 'argon2';
import { Exclude } from 'class-transformer';
import { Message } from 'src/apis/message/entities';
import { Group } from 'src/apis/group/entities';
import { Post } from 'src/apis/post/entities';
import { Note } from 'src/apis/notes/entities';
import { Confession } from 'src/apis/confessions/entities';
import { Comment } from 'src/apis/comment/entities';
import { UserProfiles } from './user-profile.entity';

@Entity()
export class Users extends BaseEntity<Users> {
	@Column({
		name: 'user_nick_name',
		nullable: true
	})
	nickName: string;

	@Column({
		name: 'user_email'
	})
	email: string;

	@Exclude()
	@Column({
		name: 'user_hash'
	})
	hash: string;

	@Column({
		name: 'user_first_name',
		nullable: true
	})
	firstName: string;

	@Column({
		name: 'user_last_name',
		nullable: true
	})
	lastName: string;

	@Column({
		name: 'user_dob',
		nullable: true
	})
	dob: Date;

	@Column({
		name: 'user_profile_picture_url',
		nullable: true
	})
	profilePictureUrl: string;

	@Column({
		name: 'user_is_find_friend',
		nullable: true
	})
	isFindFriend: boolean;

	@OneToMany(() => Message, (message) => message.user)
	@JoinColumn()
	messages: Message[];

	@OneToMany(() => Comment, (comment) => comment.user)
	@JoinColumn()
	comments: Comment[];

	@Exclude()
	@Column({ name: 'user_refresh_token', nullable: true })
	refreshToken?: string;

	@Exclude()
	@Column({ name: 'user_access_token', nullable: true })
	accessToken?: string;

	@OneToOne(() => UserProfiles, (userProfile) => userProfile.user)
	profile: UserProfiles;

	@ManyToMany(() => Group, (group) => group.users, { cascade: true, onDelete: 'CASCADE' })
	groups: Group[];

	@OneToMany(() => Post, (post) => post.author)
	posts: Post[];

	@OneToMany(() => Note, (note) => note.user, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	notes: Note[];

	@OneToMany(() => Confession, (confession) => confession.owner, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	confessions: Confession[];

	@BeforeInsert()
	@Exclude()
	async hashedPassword() {
		this.hash = await argon.hash(this.hash);
	}
}
