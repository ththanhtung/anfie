import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Note extends BaseEntity<Note> {
	@Column({
		name: 'user_id'
	})
	userId: number;

	@Column({
		name: 'note_title',
		default: ''
	})
	title: string;

	@Column({
		name: 'note_content',
		default: ''
	})
	content: string;

	@Column({
		name: 'note_is_pin',
		default: false
	})
	isPin: boolean;

	@ManyToOne(() => Users, (user) => user.notes)
	@JoinColumn({
		name: 'user_id'
	})
	user: Users;
}
