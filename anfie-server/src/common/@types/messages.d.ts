type TCreateMessageParams = {
	userId: string;
	conversationId?: string;
	groupId?: string;
	content: string;
	medias?: Express.Multer.File[];
};

type TUpdateMessageMediaParams = {
	file: Express.Multer.File;
	messageMedia: TMedia;
};

type TMessage = {
	id: string;
	content: string;
	userId: string;
	conversationId: string;
	groupId: any;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	isSeen: boolean;
	medias: MessageMedia[];
};

type TCreateMessageResponse = {
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
};

type TMedia = {
	key: string;
};
