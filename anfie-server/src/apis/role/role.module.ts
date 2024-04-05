import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities';
import { RoleRepository } from './repositories';

@Module({
	controllers: [RoleController],
	providers: [RoleService, RoleRepository],
	imports: [TypeOrmModule.forFeature([Role])],
	exports: [RoleService]
})
export class RoleModule {}
