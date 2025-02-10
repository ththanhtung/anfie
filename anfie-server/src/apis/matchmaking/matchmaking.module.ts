import { Module } from '@nestjs/common';
import { MatchmakingService } from './services/matchmaking.service';
import { ConversationModule } from '../conversation/conversation.module';
import { UserModule } from '../user/user.module';
import { LlamaModule } from '../llama/llama.module';
import { ConversationRequestModule } from '../conversation-request/conversation-request.module';
import { FriendModule } from '../friend/friend.module';

@Module({
	imports: [ConversationModule, LlamaModule, UserModule, ConversationRequestModule, FriendModule],
	providers: [MatchmakingService],
	exports: [MatchmakingService]
})
export class MatchmakingModule {}
