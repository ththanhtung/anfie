import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'conversation_requests' })
export class ConversationRequest extends BaseEntity<ConversationRequest> {
	@Column({
		name: 'first_user_id'
	})
	firstUserId: string;

	@Column({
		name: 'second_user_id'
	})
	secondUserId: string;

	@Column({
		default: 'pending'
	})
	status: TConversationRequestStatus;

	@Column({
		name: 'conversation_request_matched_reason',
		nullable: true
	})
	matchedReason: string;

	@Column({
		name: 'expiratedAt'
	})
	expiratedAt: Date;

	@Column({
		default: false,
		name: 'conversation_request_is_first_user_accepted'
	})
	isFirstUserAccepted: boolean;

	@Column({
		default: false,
		name: 'conversation_request_is_second_user_accepted'
	})
	isSecondUserAccepted: boolean;

	@OneToOne(() => Users, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'first_user_id'
	})
	firstUser: Users;

	@OneToOne(() => Users, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'second_user_id'
	})
	secondUser: Users;
}
