import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Admin } from 'src/apis/admin/entities';
import { Permission } from '../enums';
import { PERMISSION_KEY } from '../constants';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = this.getRequest(context);

		const requiredPermission = this.getPermissions(context);

		if (!requiredPermission) {
			return true;
		}

		const admin = request.user as Admin;

		const tempPermission = {};

		admin?.roles.forEach((user_role) => {
			user_role.permissions.forEach((permission) => {
				tempPermission[permission] = 1;
			});
		});
		const user_permissions = Object.keys(tempPermission);

		const validPermission = user_permissions.some((permission) => requiredPermission.includes(permission as Permission));

		console.log({ validPermission });
		if (!validPermission) {
			throw new ForbiddenException([
				{
					message: 'you do not have permission'
				}
			]);
		}

		return true;
	}

	private getPermissions(context: ExecutionContext) {
		return this.reflector.getAllAndOverride<Permission[]>(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
	}

	private getRequest(context: ExecutionContext) {
		return context.switchToHttp().getRequest<Request>();
	}
}
