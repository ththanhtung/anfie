import { Module } from '@nestjs/common';
import { FriendRequestService } from './services/friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities';
import { FriendRequestRepository } from './repositories';
import { FriendService } from '../friend/services/friend.service';
import { FriendModule } from '../friend/friend.module';

@Module({
	controllers: [FriendRequestController],
	providers: [FriendRequestService, FriendRequestRepository],
	imports: [TypeOrmModule.forFeature([FriendRequest]), FriendModule]
})
export class FriendRequestModule {}
