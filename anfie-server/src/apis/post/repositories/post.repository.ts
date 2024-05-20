import { In, Repository } from 'typeorm';
import { Post } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common';
import { GetPostsAdminDto, GetPostsDto } from '../dto';

export class PostRepository extends Repository<Post> {
	constructor(@InjectRepository(Post) repository: Repository<Post>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(createPostParams: TCreatePostParams) {
		const post = this.create();
		post.content = createPostParams.content;
		post.authorId = createPostParams.authorId;
		post.totalLikes = createPostParams.totalLikes;
		return this.save(post);
	}

	async getAll(query: GetPostsDto) {
		return pagination(this, query, {
			relations: ['author']
		});
	}

	async getPostsByUserIds(ids: string[], query: GetPostsDto) {
		return pagination(this, query, {
			where: { author: { id: In(ids) } },
			relations: ['author']
		});
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: id
			}
		});
	}

	async getAllAdmin(query: GetPostsAdminDto) {
		const options = {};
		if (query.userId) {
			options['authorId'] = query.userId;
		}
		return pagination(this, query, {
			where: options
		});
	}

	async getPostsByUserIdsAdmin(ids: number[], query: GetPostsAdminDto) {
		return pagination(this, query, {
			where: { authorId: In(ids) }
		});
	}

	async getPostsByUserId(userId: string, query: GetPostsDto) {
		return pagination(this, query, {
			where: { authorId: userId }
		});
	}
}
