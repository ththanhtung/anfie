import { Module } from '@nestjs/common';
import { ConversationRequestService } from './services/conversation-request.service';
import { ConversationRequestController } from './conversation-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationRequest } from './entities';
import { ConversationRequestRepository } from './repositories';
import { FriendModule } from '../friend/friend.module';
import { UserModule } from '../user/user.module';
import { ConversationRequestAdminController } from './conversation-request.admin.controller';
import { ConversationRequestAdminService } from './services';

@Module({
	controllers: [ConversationRequestController, ConversationRequestAdminController],
	providers: [ConversationRequestService, ConversationRequestAdminService, ConversationRequestRepository],
	imports: [TypeOrmModule.forFeature([ConversationRequest]), FriendModule, UserModule],
	exports: [ConversationRequestService]
})
export class ConversationRequestModule {}
