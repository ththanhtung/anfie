import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/common/interfaces';

export interface IEventSessionManager {
	getUserSocket(id: string): AuthenticatedSocket;
	setUserSocket(id: string, socket: AuthenticatedSocket): void;
	removeUserSocket(id: string): void;
	getSockets(): Map<string, AuthenticatedSocket>;
}

@Injectable()
export class EventSessionManager implements IEventSessionManager {
	private readonly sessions: Map<string, AuthenticatedSocket> = new Map();

	getUserSocket(id: string) {
		return this.sessions.get(id);
	}

	setUserSocket(userId: string, socket: AuthenticatedSocket) {
		this.sessions.set(userId, socket);
	}
	removeUserSocket(userId: string) {
		this.sessions.delete(userId);
	}
	getSockets(): Map<string, AuthenticatedSocket> {
		return this.sessions;
	}
}
