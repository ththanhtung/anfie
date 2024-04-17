/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { GroupModule } from './group/group.module';
import { FriendModule } from './friend/friend.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { MediaUploaderModule } from './media-uploader/media-uploader.module';
import { MessageMediaModule } from './message-media/message-media.module';
import { MatchmakingModule } from './matchmaking/matchmaking.module';
import { NotesModule } from './notes/notes.module';
import { ConfessionsModule } from './confessions/confessions.module';
import { MessageRequestsModule } from './message-requests/message-requests.module';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { ReportTiketModule } from './report-ticket/report-ticket.module';
import { OpenAIModule } from './openai/openai.module';
import { LocationsModule } from './locations/locations.module';
import { PreferencesModule } from './preferences/preferences.module';
import { TagModule } from './tag/tag.module';
import { UtilsModule } from './utils/utils.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		EventModule,
		MessageModule,
		ConversationModule,
		PostModule,
		CommentModule,
		GroupModule,
		FriendModule,
		FriendRequestModule,
		MediaUploaderModule,
		MessageMediaModule,
		MatchmakingModule,
		NotesModule,
		ConfessionsModule,
		MessageRequestsModule,
		AdminModule,
		RoleModule,
		ReportTiketModule,
		OpenAIModule,
		LocationsModule,
		PreferencesModule,
		TagModule,
		UtilsModule
	]
})
export class ApiModule {}
