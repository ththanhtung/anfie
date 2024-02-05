import { Message } from 'src/apis/message/entities';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
@Index(['creatorId', 'recipientId'], { unique: true })
export class Conversation extends BaseEntity<Conversation> {
	@Column({
		name: 'conversation_creator_id'
	})
	creatorId: number;

	@Column({
		name: 'conversation_recipient_id',
		unique: false
	})
	recipientId: number;

	@Column({
		name: 'conversation_last_message_id',
		nullable: true
	})
	lastMessageId: number;

	@OneToMany(() => Message, (message) => message.conversation, { nullable: true, cascade: true })
	@JoinColumn()
	messages: Message[];

	@OneToOne(() => Users, {
		cascade: true,
		createForeignKeyConstraints: false
	})
	@JoinColumn({
		name: 'conversation_creator_id'
	})
	creator: Users;

	@OneToOne(() => Users, {
		cascade: true,
		createForeignKeyConstraints: false
	})
	@JoinColumn({
		name: 'conversation_recipient_id'
	})
	recipient: Users;

	@Column({
		name: 'conversation_last_message_date',
		nullable: true
	})
	lastMessageDate: Date;

	@OneToOne(() => Message, (message) => message.conversation, {
		cascade: true
	})
	@JoinColumn({
		name: 'conversation_last_message_id'
	})
	lastMessage: Message;
}
