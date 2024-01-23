/* eslint-disable @typescript-eslint/no-var-requires */
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class JwtHelper {
	static sign(payload: jwt.JwtPayload, expiresIn: number | string) {
		return jwt.sign(payload, process.env.SECRET_JWT, { expiresIn });
	}

	static verify(token: string) {
		try {
			const decoded = jwt.verify(token, process.env.SECRET_JWT);
			return decoded;
		} catch (error) {
			throw new UnauthorizedException([
				{
					field: 'jwt',
					message: error.message
				}
			]);
		}
		// jwt.verify(token, process.env.SECRET_JWT, (err, decode) => {
		// 	if (err) {
		// 		throw new UnauthorizedException([
		// 			{
		// 				field: 'jwt',
		// 				message: err.message
		// 			}
		// 		]);
		// 	}

		// 	if (callback) {
		// 		callback(decode);
		// 	}
		// });
	}
}
