import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const http = context.switchToHttp();

		const response = http.getResponse<Response>();
		const request = http.getRequest<Request>();

		const code = response.statusCode;

		return next.handle().pipe(
			map((data) => {
				if (Array.isArray(data) && data.length === 2 && typeof data[1] === 'number') {
					const { page: pageQuery, limit: limitQuery } = request.query;
					const page = pageQuery ? +pageQuery : 1;
					const limit = limitQuery ? +limitQuery : 10;
					const totalItems = data[1];
					const totalPage = Math.ceil(data[1] / +limit);

					return {
						code,
						success: true,
						message: 'SUCCESS',
						errors: [],
						data: data[0],
						metadata: {
							page,
							limit,
							totalItems,
							totalPage
						}
					};
				}

				return {
					code,
					success: true,
					message: 'SUCCESS',
					errors: [],
					data
				};
			})
		);
	}
}
