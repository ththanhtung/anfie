import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageController } from './message.controller';

@Module({
	controllers: [MessageController],
	providers: [MessageService]
})
export class MessageModule {}
