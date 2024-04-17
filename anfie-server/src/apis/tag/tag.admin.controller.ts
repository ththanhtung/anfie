import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto';
import { TagAdminService } from './services';

@Controller('tags/admin')
export class TagAdminController {
	constructor(private readonly tagAdminService: TagAdminService) {}

	@Post()
	create(@Body() createTagDto: CreateTagDto) {
		return this.tagAdminService.create(createTagDto);
	}

	@Get()
	findAll(@Query() query: GetTagsDto) {
		return this.tagAdminService.findAll(query);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tagAdminService.findOneById(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tagAdminService.remove(id);
	}
}
