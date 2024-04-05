import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Permission } from '../enums';
import { RoleGuard } from '../guards';
import { PERMISSION_KEY } from '../constants';
import { AuthGuard } from '@nestjs/passport';

export function AuthAdmin(...permissions: Permission[]) {
	const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] = [UseGuards(AuthGuard('admin-jwt'), RoleGuard)];

	if (permissions.length !== 0) {
		decorators.push(SetMetadata(PERMISSION_KEY, permissions));
	}

	return applyDecorators(...decorators);
}
