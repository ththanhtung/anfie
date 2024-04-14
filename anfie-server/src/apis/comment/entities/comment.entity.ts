import { Post } from 'src/apis/post/entities';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity<Comment> {
	@Column({
		name: 'post_id'
	})
	postId: number;

	@Column({
		name: 'user_id'
	})
	userId: number;

	@Column({
		name: 'comment_parent_id',
		nullable: true,
		unique: false
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

	@ManyToOne(() => Comment, (comment) => comment.id)
	@JoinColumn({
		name: 'comment_parent_id'
	})
	parent: Comment;

	@ManyToOne(() => Users, (user) => user.comments)
	@JoinColumn({
		name: 'user_id'
	})
	user: Users;

	@ManyToOne(() => Post, (post) => post.comments)
	@JoinColumn({
		name: 'post_id'
	})
	post: Post;
}
