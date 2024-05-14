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

type TLeaveGroupParams = {
	groupId: string;
	userId: string;
};

type TRemoveGroupRecipientParams = {
	groupId: string;
	userId: string;
};

type TUpdateLastGroupMessageParams = {
	groupId: number;
	messageId: number;
};
