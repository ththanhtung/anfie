import { Controller, Post, Body, UseGuards, Get, Query, Param } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetGroupsDto } from '../dto';
import { GetPostsDto } from 'src/apis/post/dto';

@Controller('groups')
@UseGuards(AtGuard)
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Post()
	create(@GetCurrentUser() user: TUserJwt, @Body() createGroupDto: CreateGroupDto) {
		return this.groupService.create(user, createGroupDto);
	}

	@Get()
	async getMyGroups(@GetCurrentUser('userId') userId: string, @Query() query: GetGroupsDto) {
		return this.groupService.getMyGroups(userId, query);
	}

	@Get('/public/:id')
	async findPublicGroupById(@Param('id') id: string) {
		return this.groupService.findPublicGroupById(id);
	}

	@Get('/alley/:id/groups')
	async findGroupsByAlleyId(@Param('id') id: string) {
		return this.groupService.findGroupsByAlleyId(id);
	}

	@Get('/:id')
	async findPrivateGroupById(@GetCurrentUser() user: TUserJwt, @Param('id') id: string) {
		return this.groupService.findGroupById(user, id);
	}

	@Get('/:id/posts')
	async findGroupPosts(@Param('id') id: string, @Query() query: GetPostsDto) {
		return this.groupService.findGroupPosts(id, query);
	}
}
