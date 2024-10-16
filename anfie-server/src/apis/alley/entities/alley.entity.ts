import { Group } from 'src/apis/group/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Alley extends BaseEntity<Alley> {
	@Column({
		name: 'alley_parent_id',
		nullable: true,
		unique: false
	})
	parentId: string;

	@Column({
		name: 'alley_title'
	})
	title: string;

	@Column({
		name: 'alley_group_id',
		nullable: true
	})
	groupId: string;

	@Column({
		name: 'alley_left'
	})
	alleyLeft: number;

	@Column({
		name: 'alley_right'
	})
	alleyRight: number;

	@ManyToOne(() => Alley, (alley) => alley.id)
	@JoinColumn({
		name: 'alley_parent_id'
	})
	parent: Alley;

	@OneToOne(() => Group, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'alley_group_id'
	})
	group: Group;
}
