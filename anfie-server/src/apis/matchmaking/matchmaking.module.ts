import { Module } from '@nestjs/common';
import { MatchmakingService } from './services/matchmaking.service';
import { ConversationModule } from '../conversation/conversation.module';
import { UserModule } from '../user/user.module';
import { LlamaModule } from '../llama/llama.module';

@Module({
	imports: [ConversationModule, LlamaModule, UserModule],
	providers: [MatchmakingService],
	exports: [MatchmakingService]
})
export class MatchmakingModule {}
