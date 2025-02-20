import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities';
import { CommentRepository } from './repositories';
import { PostModule } from '../post/post.module';
import { FriendModule } from '../friend/friend.module';

@Module({
	controllers: [CommentController],
	providers: [CommentService, CommentRepository],
	imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => PostModule), FriendModule],
	exports: [CommentService]
})
export class CommentModule {}
