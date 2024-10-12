import { Users } from 'src/apis/user/entities';

type TCreateGroupParams = {
	creatorId?: string | null | undefined;
	adminId?: string | null | undefined;
	title: string;
	users: Users[];
	type?: string;
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
	groupId: string;
	messageId: string;
};

type TGroup = {
	id: string;
	created_at: string;
	updated_at: string;
	title: string;
	creatorId: string;
	adminId: string;
	lastMessageId: string;
	avatar: any;
	lastMessageDate: any;
	users: TUser[];
};
