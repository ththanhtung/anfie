/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { GroupModule } from './group/group.module';
import { FriendModule } from './friend/friend.module';
import { FriendRequestModule } from './friend-request/friend-request.module';

@Module({
    imports:[AuthModule, UserModule, EventModule, MessageModule, ConversationModule, PostModule, CommentModule, GroupModule, FriendModule, FriendRequestModule],
})
export class ApiModule {}