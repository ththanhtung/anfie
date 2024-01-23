/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { socketAuthMiddleware } from 'src/common/middlewares';
import { AuthenticatedSocket } from 'src/common/interfaces';
import { EventSessionManager } from './event.sesstion';

@WebSocketGateway({
	cors: {
		origin: true
	},
	pingInterval: 10000,
	pingTimeout: 15000
})
export class EventGateway {
	constructor(private readonly sessionManager: EventSessionManager) {}

	@WebSocketServer()
	server: Server;

	afterInit(client: AuthenticatedSocket) {
		client.use(socketAuthMiddleware() as any);
		console.log(client.user);
	}

	handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
		console.log('Incoming Connection');
		this.sessionManager.setUserSocket(socket.user.userId, socket);
		socket.emit('connected', {});
	}

	handleDisconnect(socket: AuthenticatedSocket) {
		console.log('handleDisconnect');
		console.log(socket.user);
	}

	@SubscribeMessage('message')
	message(@MessageBody() data: any) {
		return 'hello';
	}

	sendMessage(data: any) {
		this.server.emit('message', data);
	}
}
