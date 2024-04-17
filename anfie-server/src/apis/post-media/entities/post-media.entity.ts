import { Post } from 'src/apis/post/entities';
import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class PostMedia extends BaseEntity<PostMedia> {
	@Column()
	key?: string;

	@Column({
		name: 'post_id'
	})
	postId: number;

	@ManyToOne(() => Post, (post) => post.medias)
	@JoinColumn({
		name: 'post_id'
	})
	post: Post;

	@BeforeInsert()
	generateKey() {
		this.key = uuidv4();
	}
}
