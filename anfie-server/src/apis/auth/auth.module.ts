/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services';
import { UserModule } from '../user/user.module';
import { ProfileMediaModule } from '../profile-media/profile-media.module';

@Module({
  imports: [UserModule, ProfileMediaModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
