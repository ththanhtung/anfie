import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageController } from './message.controller';
import { Message } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageRepository } from './repositories';
import { MessageMediaModule } from '../message-media/message-media.module';

@Module({
	imports: [TypeOrmModule.forFeature([Message]), ConversationModule, MessageMediaModule],
	controllers: [MessageController],
	providers: [MessageService, MessageRepository]
})
export class MessageModule {}
