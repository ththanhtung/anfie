type TUserJwt = {
	userId: number;
	email: string;
	iat: number;
	exp: number;
};

type TUser = {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at?: any;
	email: string;
	hash: string;
	refreshToken: string;
	accessToken?: any;
};
