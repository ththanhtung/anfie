import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		let status = exception.getStatus();
		if (!status) status = 500;
		const message = exception.message;
		const exceptionResponse = exception.getResponse();

		response.status(status).send({
			code: status,
			success: false,
			message,
			errors: exceptionResponse['message'],
			data: []
		});
	}
}
