import { BaseEntity } from 'src/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tag extends BaseEntity<Tag> {
	@Column({
		name: 'tag_name'
	})
	name: string;
}
