import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageController } from './message.controller';
import { Message } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Message])],
	controllers: [MessageController],
	providers: [MessageService]
})
export class MessageModule {}
