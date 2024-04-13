import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		//origin: function (origin, callback) {
		//if (!origin || whitelist.indexOf(origin) !== -1) {
		//callback(null, true);
		//} else {
		//callback(new Error('Not allowed by CORS'));
		//}
		//}
		origin: true,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
	});

	app.setGlobalPrefix('api');

	app.use(cookieParser());

	app.enableCors({
		origin: true
	});
	await app.listen(8081);
}
bootstrap();
