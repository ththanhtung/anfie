import { Module } from '@nestjs/common';
import { FriendService } from './services/friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities';
import { FriendRepository } from './repositories';

@Module({
	controllers: [FriendController],
	providers: [FriendService, FriendRepository],
	imports: [TypeOrmModule.forFeature([Friend])],
	exports: [FriendService]
})
export class FriendModule {}
