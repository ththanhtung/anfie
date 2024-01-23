import { JwtHelper } from './jwt.helper';

export const getTokens = async (userId: string, email: string) => {
	const [at, rt] = await Promise.all([JwtHelper.sign({ userId, email }, '15m'), JwtHelper.sign({ userId, email }, '3d')]);

	return {
		accessToken: at,
		refreshToken: rt
	};
};
