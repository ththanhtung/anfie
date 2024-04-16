import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities';
import { GroupAdminController, GroupRecipientController } from './controllers';
import { UserModule } from '../user/user.module';
import { GroupRepository } from './repositories';
import { FriendModule } from '../friend/friend.module';
import { GroupAdminService } from './services';

@Module({
	imports: [TypeOrmModule.forFeature([Group]), UserModule, FriendModule],
	controllers: [GroupController, GroupRecipientController, GroupAdminController],
	providers: [GroupService, GroupRepository, GroupAdminService]
})
export class GroupModule {}
