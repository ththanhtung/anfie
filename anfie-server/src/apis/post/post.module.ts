import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities';
import { PostRepository } from './repositories';

@Module({
	imports: [TypeOrmModule.forFeature([Post])],
	controllers: [PostController],
	providers: [PostService, PostRepository]
})
export class PostModule {}
