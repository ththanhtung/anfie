/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { socketAuthMiddleware } from 'src/common/middlewares';
import { AuthenticatedSocket } from 'src/common/interfaces';
import { EventSessionManager } from './event.sesstion';
import { OnEvent } from '@nestjs/event-emitter';
import { MatchmakingService } from '../matchmaking/services';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConversationAdminService } from '../conversation/services';
import { ConversationRequestService } from '../conversation-request/services';
import { ConversationRequest } from '../conversation-request/entities';
import { UserService } from '../user/services';

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
		private readonly conversationAdminService: ConversationAdminService,
		private readonly conversationRequestService: ConversationRequestService,
		private readonly userService: UserService
	) {}

	@WebSocketServer()
	server: Server;

	afterInit(client: AuthenticatedSocket) {
		client.use(socketAuthMiddleware() as any);
		console.log(client.user);
	}

	handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
		console.log('Incoming Connection');
		console.log({ userSoket: socket.user });

		this.sessionManager.setUserSocket(socket.user.userId, socket);
		socket.emit('connected', {
			status: 'connected'
		});
	}

	async handleDisconnect(socket: AuthenticatedSocket) {
		await this.userService.removeUserFromAllPublicGroups(socket.user.userId);
		console.log(`Client disconnected: ${socket.user.userId}`);
	}

	// @SubscribeMessage('onFindNewFriend')
	// async onFindNewFriend(@MessageBody() data: any, @ConnectedSocket() client: AuthenticatedSocket) {
	// 	console.log('find new friend', client.user.userId);

	// 	await this.userService.toggleFindingFriend(client.user.userId);
	// }

	@Cron('30 * * * * *')
	async matchMaking() {
		const match = await this.matchmakingService.matchmaking();

		if (!match) return;

		const conversationRequest = await this.conversationRequestService.createOne(
			match.id1.toString(),
			match.id2.toString(),
			match.reason
		);

		const firstUserSocket = this.sessionManager.getUserSocket(conversationRequest.firstUserId);
		const secondUserSocket =
			conversationRequest.secondUserId === conversationRequest.firstUserId
				? this.sessionManager.getUserSocket(conversationRequest.firstUserId)
				: this.sessionManager.getUserSocket(conversationRequest.secondUserId);

		if (firstUserSocket) firstUserSocket.emit('onConversationRequestCreated', conversationRequest);
		if (secondUserSocket) secondUserSocket.emit('onConversationRequestCreated', conversationRequest);
	}

	@OnEvent('conversation.created')
	handleConversationCreated(conversation: any) {
		this.server.emit('onConversationCreated', conversation);
	}

	@OnEvent('messages.created')
	handleMessageCreated(payload: TCreateMessageResponse) {
		this.server.emit('messages.created', payload);
		const { recipientId, creatorId } = payload.conversation;
		const creatorSocket = this.sessionManager.getUserSocket(creatorId);
		const recipientSocket =
			recipientId === creatorId ? this.sessionManager.getUserSocket(creatorId) : this.sessionManager.getUserSocket(recipientId);

		if (creatorSocket) creatorSocket.emit('onMessage', payload);
		if (recipientSocket) recipientSocket.emit('onMessage', payload);
	}

	@OnEvent('group-messages.created')
	handleGroupMessageCreated(payload: TCreateGroupMessageResponse) {
		this.server.emit('group-messages.created', payload);
		const { users } = payload.group;

		users.forEach((user) => {
			const userSocket = this.sessionManager.getUserSocket(user.id);
			if (userSocket)
				userSocket.emit('onGroupMessage', {
					...payload,
					group: {
						...payload.group,
						users: []
					}
				});
		});
	}

	@OnEvent('conversation-request.accepted')
	async handleConversationRequestCreated(conversationRequest: ConversationRequest) {
		if (conversationRequest.isFirstUserAccepted !== null && conversationRequest.isSecondUserAccepted !== null) {
			if (conversationRequest.isFirstUserAccepted && conversationRequest.isSecondUserAccepted) {
				const conversation = await this.conversationAdminService.create({
					user1: conversationRequest.firstUserId.toString(),
					user2: conversationRequest.secondUserId.toString()
				});

				console.log({ conversation });

				const firstUserSocket = this.sessionManager.getUserSocket(conversationRequest.firstUserId);
				const secondUserSocket =
					conversationRequest.secondUserId === conversationRequest.firstUserId
						? this.sessionManager.getUserSocket(conversationRequest.firstUserId)
						: this.sessionManager.getUserSocket(conversationRequest.secondUserId);

				if (firstUserSocket) firstUserSocket.emit('onConversationCreated', conversation);
				if (secondUserSocket) secondUserSocket.emit('onConversationCreated', conversation);
			}
		}
	}

	@OnEvent('conversation-request.rejected')
	handleConversationRequestRejected(conversationRequest: ConversationRequest) {
		const firstUserSocket = this.sessionManager.getUserSocket(conversationRequest.firstUserId);
		const secondUserSocket =
			conversationRequest.secondUserId === conversationRequest.firstUserId
				? this.sessionManager.getUserSocket(conversationRequest.firstUserId)
				: this.sessionManager.getUserSocket(conversationRequest.secondUserId);

		if (firstUserSocket) firstUserSocket.emit('onConversationRequestRejected', conversationRequest);
		if (secondUserSocket) secondUserSocket.emit('onConversationRequestRejected', conversationRequest);
	}
}
