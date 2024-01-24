import { Module } from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities';
import { UserModule } from '../user/user.module';
import { ConversationRepository } from './repositories';

@Module({
	imports: [TypeOrmModule.forFeature([Conversation]), UserModule],
	providers: [ConversationService, ConversationRepository],
	controllers: [ConversationController]
})
export class ConversationModule {}
