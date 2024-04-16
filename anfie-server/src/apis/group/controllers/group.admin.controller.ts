import { Controller, Post, Body } from '@nestjs/common';
import { CreateGroupAdminDto } from '../dto/create-group.dto';
import { GroupAdminService } from '../services';

@Controller('groups/admin')
export class GroupAdminController {
	constructor(private readonly groupAdminService: GroupAdminService) {}

	@Post()
	create(@Body() createGroupDto: CreateGroupAdminDto) {
		return this.groupAdminService.create(createGroupDto);
	}
}
