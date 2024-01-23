import { Message } from 'src/apis/message/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Conversation extends BaseEntity<Conversation> {
	@Column({
		name: 'conversation_title'
	})
	title: string;

	@Column({
		name: 'conversation_last_message_date'
	})
	lastMessageDate: Date;

	@OneToMany(() => Message, (message) => message.conversation, {
		cascade: true
	})
	@JoinColumn()
	lastMessage: Message;
}
