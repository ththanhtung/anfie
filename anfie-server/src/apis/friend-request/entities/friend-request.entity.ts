import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'friend_requests' })
export class FriendRequest extends BaseEntity<FriendRequest> {
	@Column({
		name: 'sender_id'
	})
	senderId: string;

	@Column({
		name: 'receiver_id'
	})
	receiverId: string;

	@Column({
		default: 'pending'
	})
	status: TFriendRequestStatus;

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
}
