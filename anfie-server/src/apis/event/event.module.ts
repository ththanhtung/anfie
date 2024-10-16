import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { EventSessionManager } from './event.sesstion';
import { MatchmakingModule } from '../matchmaking/matchmaking.module';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationRequestModule } from '../conversation-request/conversation-request.module';
import { UserModule } from '../user/user.module';

@Module({
	imports: [MatchmakingModule, ConversationModule, ConversationRequestModule, ConversationRequestModule, UserModule],
	providers: [EventGateway, EventSessionManager]
})
export class EventModule {}
