/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services';
import { UserModule } from '../user/user.module';
import { RtStrategy } from './strategies/rt.strategy';
import { AtStrategy } from './strategies/at.strategy';
import { CookieJwtStrategy } from './strategies/cookie-jwt.stategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, RtStrategy, AtStrategy, CookieJwtStrategy]
})
export class AuthModule {}
