import { JwtHelper } from './jwt.helper';

export const getTokens = async (payload: unknown) => {
	const [at, rt] = await Promise.all([JwtHelper.sign(payload, '1y'), JwtHelper.sign(payload, '3y')]);

	return {
		accessToken: at,
		refreshToken: rt
	};
};
