import { JwtHelper } from './jwt.helper';

export const getTokens = async (userId: number, email: string) => {
	const [at, rt] = await Promise.all([JwtHelper.sign({ userId, email }, '1y'), JwtHelper.sign({ userId, email }, '3y')]);

	return {
		accessToken: at,
		refreshToken: rt
	};
};
