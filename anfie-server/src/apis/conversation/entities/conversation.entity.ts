import { Message } from 'src/apis/message/entities';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Conversation extends BaseEntity<Conversation> {
	@PrimaryColumn({
		type: 'int',
		name: 'conversation_creator_id'
	})
	creatorId: number;

	@PrimaryColumn({
		type: 'int',
		name: 'conversation_recipient_id'
	})
	recipientId: number;

	@OneToMany(() => Message, (message) => message.conversation, {
		cascade: true
	})
	@JoinColumn()
	messages: Message[];

	@OneToOne(() => Users)
	creator: Users;

	@OneToOne(() => Users)
	recipient: Users;

	@Column({
		name: 'conversation_last_message_date',
		nullable: true
	})
	lastMessageDate: Date;

	@OneToMany(() => Message, (message) => message.conversation, {
		cascade: true
	})
	@JoinColumn()
	lastMessage: Message;
}
