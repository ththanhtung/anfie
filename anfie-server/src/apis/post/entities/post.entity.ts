import { Comment } from 'src/apis/comment/entities';
import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Post extends BaseEntity<Post> {
	@Column({
		name: 'author_id'
	})
	authorId: number;

	@Column({
		name: 'group_id',
		nullable: true
	})
	groupId: number;

	@Column({
		name: 'post_content'
	})
	content: string;

	@OneToMany(() => Comment, (comment) => comment.post, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	comments: Comment[];

	@Column({
		name: 'post_total_likes',
		default: 0
	})
	totalLikes: number;

	@ManyToOne(() => Users, (user) => user.posts, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'author_id' })
	author: Users;
}
