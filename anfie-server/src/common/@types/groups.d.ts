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

type TGroup = {
	id: number;
	created_at: string;
	updated_at: string;
	title: string;
	creatorId: number;
	adminId: number;
	lastMessageId: number;
	avatar: any;
	lastMessageDate: any;
	users: TUser[];
};