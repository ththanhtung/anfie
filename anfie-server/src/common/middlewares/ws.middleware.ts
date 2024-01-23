import { Socket } from 'socket.io';
import { WsJwtGuard } from '../guards';

type TSocketIOMiddleware = {
	(client: Socket, next: (err?: Error) => void);
};

export const socketAuthMiddleware = (): TSocketIOMiddleware => {
	return (client, next) => {
		try {
			WsJwtGuard.validateToken(client);
			next();
		} catch (error) {
			next(error);
		}
	};
};
