import { Confession } from 'src/apis/confessions/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends BaseEntity<Tag> {
	@Column({
		name: 'tag_name'
	})
	name: string;

	@ManyToMany(() => Confession, (confession) => confession.tags)
	confessions?: Confession[];
}
