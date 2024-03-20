/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { socketAuthMiddleware } from 'src/common/middlewares';
import { AuthenticatedSocket } from 'src/common/interfaces';
import { EventSessionManager } from './event.sesstion';
import { OnEvent } from '@nestjs/event-emitter';
import { MatchmakingService } from '../matchmaking/services';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConversationService } from '../conversation/services';

@WebSocketGateway({
	cors: {
		origin: true
	},
	pingInterval: 10000,
	pingTimeout: 15000
})
export class EventGateway {
	constructor(
		private readonly sessionManager: EventSessionManager,
		private readonly matchmakingService: MatchmakingService,
		private readonly conversationService: ConversationService
	) {}

	@WebSocketServer()
	server: Server;

	afterInit(client: AuthenticatedSocket) {
		client.use(socketAuthMiddleware() as any);
		console.log(client.user);
	}

	handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
		console.log('Incoming Connection');
		this.sessionManager.setUserSocket(socket.user.userId, socket);
		socket.emit('connected', {
			status: 'connected'
		});
	}

	handleDisconnect(socket: AuthenticatedSocket) {
		console.log('handleDisconnect');
		console.log(socket.user);
	}

	@SubscribeMessage('onFindNewFriend')
	onFindNewFriend(@MessageBody() data: any, @ConnectedSocket() client: AuthenticatedSocket) {
		client.isFindingNewFriend = true;
	}

	@Cron(CronExpression.EVERY_5_SECONDS)
	async matchMaking() {
		const usersFindingNewFriendIds: number[] = Array.from(this.sessionManager.getSockets().entries())
			.filter(([_, socket]) => socket.isFindingNewFriend)
			.map(([userId]) => userId);

		// console.log(usersFindingNewFriendIds);

		if (usersFindingNewFriendIds.length < 4) return;
		console.log('finding new friends');

		const conversation = await this.matchmakingService.matchmaking({
			userIds: usersFindingNewFriendIds
		});

		if (!conversation) return;

		const creatorSocket = this.sessionManager.getUserSocket(conversation.creatorId);
		const recipientSocket =
			conversation.recipientId === conversation.creatorId
				? this.sessionManager.getUserSocket(conversation.creatorId)
				: this.sessionManager.getUserSocket(conversation.recipientId);
		creatorSocket.isFindingNewFriend = false;
		recipientSocket.isFindingNewFriend = false;
		if (creatorSocket) creatorSocket.emit('onConversationCreated', conversation);
		if (recipientSocket) recipientSocket.emit('onConversationCreated', conversation);
	}

	@OnEvent('conversation.created')
	handleConversationCreated(conversation: any) {
		this.server.emit('conversation.created', conversation);
		// console.log(conversation);
		this.server.emit('onConversationCreated', conversation);
	}

	@OnEvent('messages.created')
	handleMessageCreated(payload: TCreateMessageResponse) {
		this.server.emit('messages.created', payload);
		console.log(payload);
		const { recipientId, creatorId } = payload.conversation;
		const creatorSocket = this.sessionManager.getUserSocket(creatorId);
		const recipientSocket =
			recipientId === creatorId ? this.sessionManager.getUserSocket(creatorId) : this.sessionManager.getUserSocket(recipientId);

		if (creatorSocket) creatorSocket.emit('onMessage', payload);
		if (recipientSocket) recipientSocket.emit('onMessage', payload);
	}
}
