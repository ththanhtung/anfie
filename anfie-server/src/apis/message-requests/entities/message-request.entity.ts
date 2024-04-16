import { Confession } from 'src/apis/confessions/entities';
import { Users } from 'src/apis/user/entities';
import { TMessageRequestStatus } from 'src/common/@types/confession';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class MessageRequest extends BaseEntity<MessageRequest> {
	@Column({
		name: 'sender_id'
	})
	senderId: number;

	@Column({
		name: 'receiver_id'
	})
	receiverId: number;

	@Column({
		name: 'confession_id'
	})
	confessionId: number;

	@OneToOne(() => Users, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'sender_id'
	})
	sender: Users;

	@OneToOne(() => Users, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'receiver_id'
	})
	receiver: Users;

	@ManyToOne(() => Confession, (confession) => confession.messageRequests, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'confession_id'
	})
	confession: Confession;

	@Column({
		name: 'message_content'
	})
	content: string;

	@Column({
		name: 'status',
		default: 'pending'
	})
	status: TMessageRequestStatus;
}
