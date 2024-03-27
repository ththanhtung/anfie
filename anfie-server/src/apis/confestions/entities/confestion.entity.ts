import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Confestion extends BaseEntity<Confestion> {
	@Column({
		name: 'owner_id'
	})
	ownerId: number;

	@Column({
		name: 'confestion_content'
	})
	content: string;

	@ManyToOne(() => Users, (user) => user.confestions)
	@JoinColumn({ name: 'owner_id' })
	owner: Users;
}
