import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { EventSessionManager } from './event.sesstion';
import { MatchmakingModule } from '../matchmaking/matchmaking.module';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
	imports: [MatchmakingModule, ConversationModule],
	providers: [EventGateway, EventSessionManager]
})
export class EventModule {}
