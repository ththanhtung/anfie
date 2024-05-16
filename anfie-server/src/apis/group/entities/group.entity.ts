import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { GroupMessage } from './group-message.entity';

@Entity()
export class Group extends BaseEntity<Group> {
	@Column({
		name: 'group_title'
	})
	title: string;

	@Column({
		name: 'group_creator_id'
	})
	creatorId: number;

	@Column({
		name: 'group_admin_id'
	})
	adminId: number;

	@Column({
		name: 'group_last_message_id',
		nullable: true
	})
	lastMessageId: number;

	@OneToOne(() => Users, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'group_creator_id'
	})
	creator: Users;

	@OneToOne(() => Users, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'group_admin_id'
	})
	admin: Users;

	@Column({ nullable: true, name: 'group_avatar_url' })
	avatar?: string;

	@ManyToMany(() => Users, (user) => user.groups)
	@JoinTable({
		name: 'user_group',
		joinColumn: {
			name: 'group_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		}
	})
	users: Users[];

	@OneToMany(() => GroupMessage, (message) => message.group)
	@JoinColumn()
	messages: GroupMessage[];

	@Column({
		name: 'group_last_message_date',
		nullable: true
	})
	lastMessageDate: Date;

	@OneToOne(() => GroupMessage, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'group_last_message_id'
	})
	lastMessage: GroupMessage;
}
