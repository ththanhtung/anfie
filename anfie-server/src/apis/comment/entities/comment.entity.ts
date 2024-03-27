import { BaseEntity } from 'src/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class Comment extends BaseEntity<Comment> {
	@Column()
	postId: number;

	@Column()
	userId: number;

	@Column({
		name: 'comment_parent_id'
	})
	parentId: number;

	@Column({
		name: 'comment_content'
	})
	content: string;

	@Column({
		name: 'comment_left'
	})
	commentLeft: number;

	@Column({
		name: 'comment_right'
	})
	commentRight: number;
}
