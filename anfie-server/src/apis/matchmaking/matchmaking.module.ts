import { Module } from '@nestjs/common';
import { MatchmakingService } from './services/matchmaking.service';
import { MatchmakingController } from './matchmaking.controller';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
	imports: [ConversationModule],
	controllers: [MatchmakingController],
	providers: [MatchmakingService],
	exports: [MatchmakingService]
})
export class MatchmakingModule {}
