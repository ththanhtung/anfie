import { Module } from '@nestjs/common';
import { AlleyService } from './services/alley.service';
import { AlleyController } from './alley.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alley } from './entities';
import { AlleyRepository } from './repositories';
import { GroupModule } from '../group/group.module';
import { AlleyAdminController } from './alley.admin.controller';

@Module({
	controllers: [AlleyController, AlleyAdminController],
	providers: [AlleyService, AlleyRepository],
	imports: [TypeOrmModule.forFeature([Alley]), GroupModule],
	exports: [AlleyService]
})
export class AlleyModule {}
