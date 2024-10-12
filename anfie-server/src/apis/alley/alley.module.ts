import { Module } from '@nestjs/common';
import { AlleyService } from './services/alley.service';
import { AlleyController } from './alley.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alley } from './entities';
import { AlleyRepository } from './repositories';
import { GroupModule } from '../group/group.module';

@Module({
	controllers: [AlleyController],
	providers: [AlleyService, AlleyRepository],
	imports: [TypeOrmModule.forFeature([Alley]), GroupModule],
	exports: [AlleyService]
})
export class AlleyModule {}
