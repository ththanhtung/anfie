import { Controller, Post, Body, UseGuards, Get, Query, Param } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { GetGroupsDto } from '../dto';

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
}
