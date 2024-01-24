import { BadRequestException, ClassSerializerInterceptor, Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { ApiModule } from './apis/api.module';
import { ConfigModule } from './configs/config.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters';
import { ResponseTransformInterceptor } from './common/interceptors';
import { EventEmitterModule } from '@nestjs/event-emitter';

const exceptionFactory = (errors: ValidationError[]) => {
	throw new BadRequestException(
		errors.map((err) => {
			return validationErrors(err);
		})
	);
};

const validationErrors = (err: ValidationError) => {
	if (!err.constraints && err.children && err.children.length > 0) {
		return validationErrors(err.children[0]);
	}

	return {
		field: err.property,
		message: err.constraints ? Object.values(err.constraints)[0] : ''
	};
};

@Module({
	imports: [ConfigModule, DatabaseModule, ApiModule, EventEmitterModule.forRoot()],
	providers: [
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				exceptionFactory
			})
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseTransformInterceptor
		}
	]
})
export class AppModule {}
