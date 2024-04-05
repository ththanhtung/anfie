import { Global, Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';
import { AdminJwtStrategy, AtStrategy, CookieJwtStrategy, RtStrategy } from './strategies/jwt';
import { AdminModule } from 'src/apis/admin/admin.module';

@Global()
@Module({
	imports: [NestPassportModule, AdminModule],
	providers: [AtStrategy, RtStrategy, CookieJwtStrategy, AdminJwtStrategy]
})
export class PassportModule {}
