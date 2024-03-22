import { Users } from 'src/apis/user/entities';

type TCreateGroupParams = {
	creatorId: string;
	adminId: string;
	title: string;
	users: Users[];
};

type TAddGroupRecipientParams = {
	groupId: string;
	recipientId: string;
};
