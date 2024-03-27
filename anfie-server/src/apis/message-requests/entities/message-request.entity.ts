import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class MessageRequest extends BaseEntity<MessageRequest> {
	@Column({
		name: 'sender_id'
	})
	senderId: string;

	@Column({
		name: 'receiver_id'
	})
	receiverId: string;

	@Column({
		name: 'confestion_id'
	})
	confestionId: string;

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

	@Column({
		name: 'confestion_content'
	})
	content: string;

	@Column({
		name: 'status',
		default: 'pending'
	})
	status: TMessageRequestStatus;
}
