import { Conversation } from 'src/apis/conversation/entities';
import { Group } from 'src/apis/group/entities';
import { MessageMedia } from 'src/apis/message-media/entities/message-media.entity';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Message extends BaseEntity<Message> {
	@Column({
		name: 'message_content'
	})
	content: string;

	@Column({
		name: 'message_is_seen',
		default: false
	})
	isSeen?: boolean;

	@Column({
		name: 'user_id'
	})
	userId: number;

	@Column({
		name: 'group_id',
		nullable: true
	})
	groupId?: number;

	@Column({
		name: 'conversation_id',
		nullable: true
	})
	conversationId?: number;

	@OneToMany(() => MessageMedia, (messageMedia) => messageMedia.message)
	@JoinColumn()
	medias: MessageMedia[];

	@ManyToOne(() => Users, (user) => user.messages)
	@JoinColumn({
		name: 'user_id'
	})
	user: Users;

	@ManyToOne(() => Group, (group) => group.messages)
	@JoinColumn({
		name: 'group_id'
	})
	group: Group;

	@ManyToOne(() => Conversation, (conversation) => conversation.messages)
	@JoinColumn({ name: 'conversation_id' })
	conversation: Conversation;
}
