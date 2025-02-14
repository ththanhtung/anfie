import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Friend extends BaseEntity<Friend> {
	@Column({
		name: 'follower_id'
	})
	followerId: string;

	@Column({
		name: 'followee_id'
	})
	followeeId: string;

	@ManyToOne(() => Users, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'follower_id'
	})
	follower: Users;

	@ManyToOne(() => Users, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'followee_id'
	})
	followee: Users;
}
