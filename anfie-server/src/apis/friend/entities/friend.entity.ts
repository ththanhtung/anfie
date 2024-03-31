import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Friend extends BaseEntity<Friend> {
	@Column({
		name: 'follower_id'
	})
	followerId: number;

	@Column({
		name: 'followee_id'
	})
	followeeId: number;

	@ManyToOne(() => Users, { createForeignKeyConstraints: false })
	follower: Users;

	@ManyToOne(() => Users, { createForeignKeyConstraints: false })
	followee: Users;
}
