import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { JwtHelper } from '../helpers';
import { AuthenticatedSocket } from '../interfaces';

@Injectable()
export class WsJwtGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		if (context.getType() === 'ws') {
			return true;
		}

		const client: Socket = context.switchToWs().getClient();

		WsJwtGuard.validateToken(client);

		return true;
	}

	static validateToken(client: AuthenticatedSocket) {
		const { authorization } = client.handshake.headers;
		if (!authorization) {
			throw new ForbiddenException([
				{
					field: 'authorization',
					message: 'invalid token'
				}
			]);
		}
		const token = authorization.replace('Bearer ', '');

		const payload = JwtHelper.verify(token);

		client.user = payload;

		return payload;
	}
}
