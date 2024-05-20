type TUserJwt = {
	userId: string;
	email: string;
	iat: number;
	exp: number;
};

type TUser = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at?: string;
	email: string;
	hash: string;
	refreshToken: string;
	accessToken?: string;
	firstName?: string;
	lastName?: string;
	dob: any;
	profilePictureUrl: string;
};

type TUserProfile = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	firstName: string;
	lastName: string;
	dob: string;
	gender: string;
	phone: string;
	maxAge: any;
	minAge: any;
	isActive: boolean;
	isBanned: boolean;
	reportedCount: number;
	profilePictureUrl: any;
	bio: string;
	strangerConversationSlots: number;
	userId: string;
};
