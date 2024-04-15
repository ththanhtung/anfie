import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto';

@Controller('tags')
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@Post()
	create(@Body() createTagDto: CreateTagDto) {
		return this.tagService.create(createTagDto);
	}

	@Get()
	findAll(@Query() query: GetTagsDto) {
		return this.tagService.findAll(query);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tagService.findOneById(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tagService.remove(id);
	}
}
