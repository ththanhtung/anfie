import { Message } from 'src/apis/message/entities';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Conversation extends BaseEntity<Conversation> {
	@Column({
		name: 'conversation_creator_id'
	})
	creatorId: number;

	@Column({
		name: 'conversation_recipient_id'
	})
	recipientId: number;

	@OneToMany(() => Message, (message) => message.conversation, { nullable: true })
	@JoinColumn()
	messages: Message[];

	@OneToOne(() => Users)
	@JoinColumn({
		name: 'conversation_creator_id'
	})
	creator: Users;

	@OneToOne(() => Users)
	@JoinColumn({
		name: 'conversation_recipient_id'
	})
	recipient: Users;

	@Column({
		name: 'conversation_last_message_date',
		nullable: true
	})
	lastMessageDate: Date;

	@OneToMany(() => Message, (message) => message.conversation, {
		cascade: true
	})
	lastMessage: Message;
}
