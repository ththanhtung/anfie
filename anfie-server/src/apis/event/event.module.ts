import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { EventSessionManager } from './event.sesstion';

@Module({
	providers: [EventGateway, EventSessionManager]
})
export class EventModule {}
