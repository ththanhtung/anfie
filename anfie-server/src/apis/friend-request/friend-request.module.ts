import { Module } from '@nestjs/common';
import { FriendRequestService } from './services/friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities';
import { FriendRequestRepository } from './repositories';
import { FriendModule } from '../friend/friend.module';
import { UserModule } from '../user/user.module';
import { FriendRequestAdminController } from './friend-request.admin.controller';
import { FriendRequestAdminService } from './services';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
	controllers: [FriendRequestController, FriendRequestAdminController],
	providers: [FriendRequestService, FriendRequestAdminService, FriendRequestRepository],
	imports: [TypeOrmModule.forFeature([FriendRequest]), FriendModule, UserModule, ConversationModule]
})
export class FriendRequestModule {}
