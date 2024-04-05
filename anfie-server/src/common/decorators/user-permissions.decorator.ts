import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enums';
import { PERMISSION_KEY } from '../constants';

export const UsePermission = (...permissions: Permission[]) => SetMetadata(PERMISSION_KEY, permissions);
