import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities';
import { GroupRecipientController } from './controllers';
import { UserModule } from '../user/user.module';
import { GroupRepository } from './repositories';

@Module({
	imports: [TypeOrmModule.forFeature([Group]), UserModule],
	controllers: [GroupController, GroupRecipientController],
	providers: [GroupService, GroupRepository]
})
export class GroupModule {}
