import { Module } from '@nestjs/common';
import { ConfigModule as NestJSConfigModule } from '@nestjs/config';
import { validate } from './env.validation';

@Module({
	imports: [
		NestJSConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
			isGlobal: true,
			validate
		})
	],
	controllers: [],
	providers: [],
	exports: [NestJSConfigModule]
})
export class ConfigModule {}
