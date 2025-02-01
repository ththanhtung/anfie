import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageController } from './message.controller';
import { Message } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageRepository } from './repositories';
import { MessageMediaModule } from '../message-media/message-media.module';
import { UserModule } from '../user/user.module';
import { MessageAdminController } from './message.admin.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Message]), ConversationModule, MessageMediaModule, UserModule],
	controllers: [MessageController, MessageAdminController],
	providers: [MessageService, MessageRepository],
	exports: [MessageService]
})
export class MessageModule {}
