import { Global, Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';
import { AdminJwtStrategy, AtStrategy, CookieJwtStrategy, RtStrategy } from './strategies/jwt';
import { AdminModule } from 'src/apis/admin/admin.module';
import { UserModule } from 'src/apis/user/user.module';

@Global()
@Module({
	imports: [NestPassportModule, AdminModule, UserModule],
	providers: [AtStrategy, RtStrategy, CookieJwtStrategy, AdminJwtStrategy]
})
export class PassportModule {}
