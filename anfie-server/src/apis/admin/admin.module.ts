import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities';
import { AdminRepository } from './repositories';
import { RoleModule } from '../role/role.module';

@Module({
	controllers: [AdminController],
	providers: [AdminService, AdminRepository],
	imports: [TypeOrmModule.forFeature([Admin]), RoleModule],
	exports: [AdminService]
})
export class AdminModule {}
