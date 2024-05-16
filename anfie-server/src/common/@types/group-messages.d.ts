type TCreateGroupMessageParams = {
	userId: number;
	groupId: number;
	content: string;
	medias?: Express.Multer.File[];
};

type TUpdateGroupMessageMediaParams = {
	file: Express.Multer.File;
	messageMedia: GroupMessageMedia;
};

type TGroupMessage = {
	id: number;
	content: string;
	userId: number;
	conversationId: number;
	groupId: any;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	isSeen: boolean;
	medias: GroupMessageMedia[];
};

type TCreateGroupMessageResponse = {
	content: string;
	userId: number;
	conversationId: number;
	conversation: TCreateConversationResponse;
	groupId: any;
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	isSeen: boolean;
	group: TGroup;
};
