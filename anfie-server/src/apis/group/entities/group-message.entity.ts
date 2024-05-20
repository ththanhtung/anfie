import { Group } from 'src/apis/group/entities';
import { MessageMedia } from 'src/apis/message-media/entities/message-media.entity';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class GroupMessage extends BaseEntity<GroupMessage> {
	@Column({
		name: 'group_message_content'
	})
	content: string;

	@Column({
		name: 'group_message_is_seen',
		default: false
	})
	isSeen?: boolean;

	@Column({
		name: 'user_id'
	})
	userId: string;

	@Column({
		name: 'group_id',
		nullable: true
	})
	groupId?: string;

	@OneToMany(() => MessageMedia, (messageMedia) => messageMedia.message)
	@JoinColumn()
	medias: MessageMedia[];

	@ManyToOne(() => Users, (user) => user.messages, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	@JoinColumn({
		name: 'user_id'
	})
	user: Users;

	@ManyToOne(() => Group)
	@JoinColumn({
		name: 'group_id'
	})
	group: Group;
}
