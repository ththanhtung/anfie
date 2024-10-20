import { Role } from 'src/apis/role/entities';

type TCreateAdminParams = {
	name: string;
	username: string;
	hash: string;
	type?: AdminUserType;
	roles: Role[];
};

type TAdminJwt = {
	adminId: string;
	username: string;
	roles: string[];
	iat: number;
	exp: number;
};
