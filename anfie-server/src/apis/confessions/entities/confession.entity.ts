import { MessageRequest } from 'src/apis/message-requests/entities';
import { Tag } from 'src/apis/tag/entities';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

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

	@ManyToMany(() => Tag, (tag) => tag.confessions)
	@JoinTable({
		name: 'confession_tag',
		joinColumn: {
			name: 'confession_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'tag_id',
			referencedColumnName: 'id'
		}
	})
	tags: Tag[];

	@OneToMany(() => MessageRequest, (message) => message.confession, { nullable: true, cascade: true, onDelete: 'CASCADE' })
	@JoinColumn()
	messageRequests: MessageRequest[];
}
