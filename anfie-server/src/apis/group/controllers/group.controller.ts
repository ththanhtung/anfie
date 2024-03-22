import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { AtGuard, GetCurrentUser } from 'src/common';

@Controller('groups')
@UseGuards(AtGuard)
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Post()
	create(@GetCurrentUser() user: TUserJwt, @Body() createGroupDto: CreateGroupDto) {
		return this.groupService.create(user, createGroupDto);
	}
}
