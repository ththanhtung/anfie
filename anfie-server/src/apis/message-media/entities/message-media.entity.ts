import { GroupMessage } from 'src/apis/group/entities';
import { Message } from 'src/apis/message/entities';
import { EMessageType } from 'src/common';
import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class MessageMedia extends BaseEntity<MessageMedia> {
	@Column()
	key?: string;

	@Column({
		name: 'message_id',
		nullable: true
	})
	messageId: string;

	@Column({
		name: 'group_message_id',
		nullable: true
	})
	groupMessageId?: string;

	@Column({
		name: 'message_media_type',
		type: 'enum',
		enum: EMessageType,
		default: EMessageType.CONVERSATION
	})
	type: EMessageType;

	@ManyToOne(() => Message, (message) => message.medias, { cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'message_id'
	})
	message: Message;

	@ManyToOne(() => GroupMessage, (message) => message.medias, { cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'group_message_id'
	})
	groupMessage: GroupMessage;

	@BeforeInsert()
	generateKey() {
		this.key = uuidv4();
	}

	@Column({
		name: 'message_media_url',
		nullable: true
	})
	url: string;
}
