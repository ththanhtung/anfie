/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CookieJwtGuard extends AuthGuard('cookie-jwt') {}