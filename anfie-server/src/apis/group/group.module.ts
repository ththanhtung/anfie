import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group, GroupMessage } from './entities';
import { GroupAdminController, GroupMessagesController, GroupRecipientController } from './controllers';
import { UserModule } from '../user/user.module';
import { GroupMessageRepository, GroupRepository } from './repositories';
import { FriendModule } from '../friend/friend.module';
import { GroupAdminService, GroupMessageService } from './services';
import { MessageMediaModule } from '../message-media/message-media.module';

@Module({
	imports: [TypeOrmModule.forFeature([Group, GroupMessage]), UserModule, FriendModule, MessageMediaModule],
	controllers: [GroupController, GroupRecipientController, GroupAdminController, GroupMessagesController],
	providers: [GroupService, GroupRepository, GroupAdminService, GroupMessageRepository, GroupMessageService],
	exports: [GroupService]
})
export class GroupModule {}
