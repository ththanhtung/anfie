import { Message } from 'src/apis/message/entities';
import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class MessageMedia extends BaseEntity<MessageMedia> {
	@Column()
	key?: string;

	@Column({
		name: 'message_id'
	})
	messageId: string;

	@ManyToOne(() => Message, (message) => message.medias, { cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'message_id'
	})
	message: Message;

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
