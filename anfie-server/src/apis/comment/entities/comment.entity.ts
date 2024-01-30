import { BaseEntity } from 'src/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class Comment extends BaseEntity<Comment> {
	@Column()
	postId: number;

	@Column()
	userId: number;

	@Column()
	parentId: number;

	@Column()
	content: string;

	@Column()
	commnentLeft: number;

	@Column()
	commentRight: number;
}
