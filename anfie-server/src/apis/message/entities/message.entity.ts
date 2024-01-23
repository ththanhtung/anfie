import { Conversation } from 'src/apis/conversation/entities';
import { Group } from 'src/apis/group/entities';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Message extends BaseEntity<Message> {
	@Column({
		name: 'message_content'
	})
	content: string;
	@Column({
		name: 'message_is_seen'
	})
	isSeen: boolean;

	@ManyToOne(() => Users)
	@JoinColumn()
	user: Users;

	@ManyToOne(() => Group)
	@JoinColumn()
	group: Group;

	@ManyToOne(() => Conversation)
	@JoinColumn()
	conversation: Conversation;
}
