import { MessageRequest } from 'src/apis/message-requests/entities';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Confession extends BaseEntity<Confession> {
	@Column({
		name: 'owner_id'
	})
	ownerId: number;

	@Column({
		name: 'confession_content'
	})
	content: string;

	@ManyToOne(() => Users, (user) => user.confessions)
	@JoinColumn({ name: 'owner_id' })
	owner: Users;

	@OneToMany(() => MessageRequest, (message) => message.confession, { nullable: true, cascade: true, onDelete: 'CASCADE' })
	@JoinColumn()
	messageRequests: MessageRequest[];
}
