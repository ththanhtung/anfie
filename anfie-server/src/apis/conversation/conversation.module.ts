import { Module } from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { ConversationController } from './conversation.controller';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
