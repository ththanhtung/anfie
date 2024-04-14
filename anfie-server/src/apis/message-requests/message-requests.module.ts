import { Module } from '@nestjs/common';
import { MessageRequestsService } from './services/message-requests.service';
import { MessageRequestsController } from './message-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRequest } from './entities';
import { MessageRequestRepository } from './repositories';
import { ConversationModule } from '../conversation/conversation.module';
import { ConfessionsModule } from '../confessions/confessions.module';
import { UserModule } from '../user/user.module';

@Module({
	controllers: [MessageRequestsController],
	providers: [MessageRequestsService, MessageRequestRepository],
	imports: [TypeOrmModule.forFeature([MessageRequest]), ConversationModule, ConfessionsModule, UserModule]
})
export class MessageRequestsModule {}
