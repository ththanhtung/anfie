type TCreateGroupMessageParams = {
	userId: string;
	groupId: string;
	content: string;
	medias?: Express.Multer.File[];
};

type TUpdateGroupMessageMediaParams = {
	file: Express.Multer.File;
	messageMedia: GroupMessageMedia;
};

type TGroupMessage = {
	id: string;
	content: string;
	userId: string;
	conversationId: string;
	groupId: string;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	isSeen: boolean;
	medias: GroupMessageMedia[];
};

type TCreateGroupMessageResponse = {
	content: string;
	userId: string;
	conversationId: string;
	conversation: TCreateConversationResponse;
	groupId: string;
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	isSeen: boolean;
	group: TGroup;
};
