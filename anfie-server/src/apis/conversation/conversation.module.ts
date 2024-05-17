import { Module } from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities';
import { UserModule } from '../user/user.module';
import { ConversationRepository } from './repositories';
import { ConversationAdminService } from './services';
import { ConversationAdminController } from './conversation.admin.controller';
import { FriendModule } from '../friend/friend.module';

@Module({
	imports: [TypeOrmModule.forFeature([Conversation]), UserModule, FriendModule],
	providers: [ConversationService, ConversationRepository, ConversationAdminService],
	controllers: [ConversationController, ConversationAdminController],
	exports: [ConversationService, ConversationAdminService]
})
export class ConversationModule {}
