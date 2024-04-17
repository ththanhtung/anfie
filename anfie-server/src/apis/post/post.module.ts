import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities';
import { PostRepository } from './repositories';
import { FriendModule } from '../friend/friend.module';
import { PostMediaModule } from '../post-media/post-media.module';

@Module({
	imports: [TypeOrmModule.forFeature([Post]), FriendModule, PostMediaModule],
	controllers: [PostController],
	providers: [PostService, PostRepository],
	exports: [PostService]
})
export class PostModule {}
