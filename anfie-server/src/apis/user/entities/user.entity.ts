import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import * as argon from 'argon2';
import { Exclude } from 'class-transformer';
import { Message } from 'src/apis/message/entities';
import { Group } from 'src/apis/group/entities';
import { Post } from 'src/apis/post/entities';
import { Note } from 'src/apis/notes/entities';
import { Confession } from 'src/apis/confessions/entities';

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
