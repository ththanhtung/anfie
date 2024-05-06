import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { EventSessionManager } from './event.sesstion';
import { MatchmakingModule } from '../matchmaking/matchmaking.module';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationRequestModule } from '../conversation-request/conversation-request.module';

@Module({
	imports: [MatchmakingModule, ConversationModule, ConversationRequestModule, ConversationRequestModule],
	providers: [EventGateway, EventSessionManager]
})
export class EventModule {}
