import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleQueryDto } from './dto';
import { Permission } from 'src/common';

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.create(createRoleDto);
	}

	@Get()
	findAll(@Query() query: GetRoleQueryDto) {
		return this.roleService.findAll(query);
	}

	@Get('/permission')
	getAllPermission() {
		return Object.values(Permission);
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.roleService.getDetailById(id);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
		return this.roleService.update(id, updateRoleDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.roleService.remove(id);
	}
}
