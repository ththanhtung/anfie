import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories';
import { GetPostsAdminDto } from '../dto';

@Injectable()
export class PostAdminService {
	constructor(private readonly postRepository: PostRepository) {}
	async findAll(query: GetPostsAdminDto) {
		return this.postRepository.getAllAdmin(query);
	}

	async findOneById(id: string) {
		return this.postRepository.findOneById(id);
	}
}
