import { Module } from '@nestjs/common';
import { MatchmakingService } from './services/matchmaking.service';
import { ConversationModule } from '../conversation/conversation.module';
import { OpenAIModule } from '../openai/openai.module';
import { UserModule } from '../user/user.module';

@Module({
	imports: [ConversationModule, OpenAIModule, UserModule],
	providers: [MatchmakingService],
	exports: [MatchmakingService]
})
export class MatchmakingModule {}
