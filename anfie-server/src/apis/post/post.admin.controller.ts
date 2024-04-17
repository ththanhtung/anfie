import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetPostsAdminDto } from './dto';
import { PostAdminService } from './services';

@Controller('posts/admin')
export class PostAdminController {
	constructor(private readonly postAdminService: PostAdminService) {}

	@Get()
	async findAll(@Query() query: GetPostsAdminDto) {
		return this.postAdminService.findAll(query);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.postAdminService.findOneById(id);
	}
}
